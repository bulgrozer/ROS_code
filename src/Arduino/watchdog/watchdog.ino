

#define INITIMEOUT 5000


const int redLed1 = 2;  // indicates if the raspy1 has crashed
const int greenLed1 = 3;  // indicates if the raspy1 is alive
const int yellowLed = 4;  // indicates if the TJP is activated
#define  TJPACTBTN  5
const int redLed2 = 6; // indicates if the raspy2 has crashed
const int greenLed2 = 7; // indicates if the raspy2 is alive

const int aliveRaspy1 = 8; // impulse signal
const int inStateRaspy1 = 9; // Raspy 1 indicates its state to arduino HIGH=master LOW=follower
const int outStateRaspy1 = 10; // arduino imposes the master/follower state to Raspy 1 HIGH=master LOW=follower

const int aliveRaspy2 = 11; // impulse signal
const int inStateRaspy2 = 12; // Raspy 2 indicates its state to arduino HIGH=master LOW=follower
const int outStateRaspy2 = 13; // arduino imposes the master/follower state to Raspy 2 HIGH=master LOW=follower


int timeout;
int masterRpi = -1;
int lastState = 0;
int activate;

void setup() {
  // put your setup code here, to run once:
  pinMode(TJPACTBTN, INPUT);

  pinMode(aliveRaspy1, INPUT);
  pinMode(aliveRaspy2, INPUT);
  pinMode(inStateRaspy1, INPUT);
  pinMode(inStateRaspy2, INPUT);

  pinMode(outStateRaspy1, OUTPUT);
  pinMode(outStateRaspy2, OUTPUT);
  pinMode(redLed1, OUTPUT);
  pinMode(greenLed1, OUTPUT);
  pinMode(redLed2, OUTPUT);
  pinMode(greenLed2, OUTPUT);
  pinMode(yellowLed, OUTPUT);

  // initialization
  digitalWrite(outStateRaspy1, LOW); // Raspy1 is not master
  digitalWrite(outStateRaspy2, LOW); // Raspy2 is not master
  digitalWrite(redLed1, LOW);
  digitalWrite(greenLed1, LOW);
  digitalWrite(redLed2, LOW);
  digitalWrite(greenLed2, LOW);
  digitalWrite(yellowLed, LOW);

  timeout = INITIMEOUT;
  activate = 1;
}


void loop() {

  // put your main code here, to run repeatedly:
  //Update LED states following the info from raspis :
  digitalWrite(greenLed1, digitalRead(inStateRaspy1));
  digitalWrite(greenLed2, digitalRead(inStateRaspy2));

  if (digitalRead(TJPACTBTN) && activate) // to activate the TJP
  {
    activate = 0;
    digitalWrite(outStateRaspy1, HIGH); // Raspy1 is master
    masterRpi = 1;
    digitalWrite(outStateRaspy2, LOW); // Raspy2 is follower
    delay(1000);
    digitalWrite(yellowLed, HIGH);
  }
  else if (digitalRead(TJPACTBTN) == LOW) // to disable the TJP
  {
    digitalWrite(outStateRaspy1, LOW); // Raspy1 is follower
    digitalWrite(outStateRaspy2, LOW); // Raspy2 is follower
    digitalWrite(yellowLed, LOW);
    activate = 1;
  }

  timeout--;
  if (timeout < 0) timeout = 0;

  if (masterRpi == 1)   // Raspy 1 is master
  {
    if (digitalRead(aliveRaspy1) == LOW)
      lastState = 0;

    // Look for a rising edge
    if (lastState == 0 && digitalRead(aliveRaspy1))
    {
      timeout = INITIMEOUT;  // reset the timeout when it detects a new rising edge in the impulse signal
      lastState = 1;
    }
    
    if (timeout != 0 )  // if the raspy is still alive
    {
      if (digitalRead(inStateRaspy1) == LOW) // if the raspy asks to be a follower
      {
        digitalWrite(outStateRaspy2, HIGH); // the raspy 2 will be now a master
        digitalWrite(outStateRaspy1, LOW);
        masterRpi = 2;
        lastState = 0;
        timeout = INITIMEOUT;  // reset the timeout

      }
    }
    else // if the raspy has crashed
    {
      digitalWrite(redLed1, HIGH);
      digitalWrite(outStateRaspy2, HIGH);
      digitalWrite(outStateRaspy1, LOW);
      masterRpi = 2;
      lastState = 0;
      timeout = INITIMEOUT;  // reset the timeout
      delay(1000);

    }
  }


  if (masterRpi == 2)  // the raspy backup becomes a master
  {
    if (digitalRead(aliveRaspy2) == LOW)
      lastState = 0;

    if (lastState == 0 && digitalRead(aliveRaspy2))
    {
      timeout = INITIMEOUT;
      lastState = 1;
    }

    if (timeout == 0)
    {
      digitalWrite(redLed2, HIGH);
      digitalWrite(outStateRaspy2, LOW);
      masterRpi = -1;
      delay(2000);
      digitalWrite(yellowLed, LOW);


    }
  }


}

