
#define  TJPACTBTN  7
#define INITIMEOUT 5000

const int aliveRaspy1=8; // impulse signal 
const int inStateRaspy1=9; // Raspy 1 indicates its state to arduino HIGH=master LOW=follower
const int outStateRaspy1=10; // arduino imposes the master/follower state to Raspy 1 HIGH=master LOW=follower
const int redLed1=5;
const int greenLed1=6;

const int aliveRaspy2=11; // impulse signal
const int inStateRaspy2=12; // Raspy 2 indicates its state to arduino HIGH=master LOW=follower
const int outStateRaspy2=13; // arduino imposes the master/follower state to Raspy 2 HIGH=master LOW=follower
const int redLed2=2;
const int greenLed2=3;

int timeout = INITIMEOUT;
int masterRpi = -1;
int lastState = 0;


void setup() {
  // put your setup code here, to run once:
  pinMode(TJPACTBTN, INPUT);
    
  pinMode(aliveRaspy1,INPUT);
  pinMode(aliveRaspy2, INPUT);
  pinMode(inStateRaspy1, INPUT);
  pinMode(inStateRaspy2, INPUT);
  pinMode(outStateRaspy1, OUTPUT);
  pinMode(outStateRaspy2, OUTPUT);
  pinMode(redLed1, OUTPUT);
  pinMode(greenLed1, OUTPUT);
  pinMode(redLed2, OUTPUT);
  pinMode(greenLed2, OUTPUT);
  
  // initialization
  digitalWrite(outStateRaspy1, LOW); // Raspy1 is not master
  digitalWrite(outStateRaspy2, LOW); // Raspy2 is not master
  digitalWrite(redLed1, LOW);
  digitalWrite(greenLed1, LOW);
  digitalWrite(redLed2, LOW);
  digitalWrite(greenLed2, LOW);
}


void loop() {
  // put your main code here, to run repeatedly:
   
   if (digitalRead(TJPACTBTN))
   {
    digitalWrite(outStateRaspy1, HIGH); // Raspy1 is master
    masterRpi = 1;
    digitalWrite(outStateRaspy2, LOW); // Raspy2 is follower
   }

  if (masterRpi == 1)   
  {
      digitalWrite(greenLed1, HIGH);
       
      if (digitalRead(aliveRaspy1)== LOW)
      {
        lastState = 0;
      }
      
      if (lastState == 0 && digitalRead(aliveRaspy1))
      {
        timeout = INITIMEOUT;
      }    
     
      timeout--;
    
      if (timeout != 0 )
      {
          digitalWrite(outStateRaspy2, !(digitalRead(inStateRaspy1))); // arduino imposes to Raspy2 the opposite state of Raspy1
        
          if(digitalRead(inStateRaspy1) == LOW)
          {
            digitalWrite(outStateRaspy2,HIGH); 
            digitalWrite(outStateRaspy1,LOW);
            masterRpi = 2;   
            lastState = 0;
          }
      }
      
      if (timeout == 0)
        {
           digitalWrite(redLed1, HIGH);
           digitalWrite(outStateRaspy2,HIGH); 
           digitalWrite(outStateRaspy1,LOW);
           masterRpi = 2;
           lastState = 0;
        }
  }

   
  if (masterRpi == 2)
  {
           digitalWrite(greenLed2, HIGH);
            
           if (digitalRead(aliveRaspy2) == LOW)
            {
              lastState = 0;
            }
            
            if (lastState == 0 && digitalRead(aliveRaspy2))
            {
              timeout = INITIMEOUT;
            }    
           
            timeout--;

            if (timeout==0)
            {
              digitalWrite(redLed2, HIGH);
              digitalWrite(outStateRaspy2,LOW);
             
            }
   }
           
    
 }
 
