
#define  TJPACTBTN  10
#define INITIMEOUT 5000

const int aliveRaspy1=2; // impulse signal 
const int aliveRaspy2=3; // impulse signal
const int inStateRaspy1=4; // Raspy 1 indicates its state to arduino HIGH=master LOW=follower
const int inStateRaspy2=5; // Raspy 2 indicates its state to arduino HIGH=master LOW=follower
const int outStateRaspy1=6; // arduino imposes the master/follower state to Raspy 1 HIGH=master LOW=follower
const int outStateRaspy2=7; // arduino imposes the master/follower state to Raspy 2 HIGH=master LOW=follower
const int disableTJP = 8;   // if HIGH disable TJP

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
  pinMode(disableTJP, OUTPUT);
  
  // initialization
  digitalWrite(outStateRaspy1, LOW); // Raspy1 is not master
  digitalWrite(outStateRaspy2, LOW); // Raspy2 is not master
  digitalWrite(disableTJP, LOW);
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
           digitalWrite(outStateRaspy2,HIGH); 
           digitalWrite(outStateRaspy1,LOW);
           masterRpi = 2;
           lastState = 0;
        }
  }

   
  if (masterRpi == 2)
  {
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
              digitalWrite(outStateRaspy2,LOW);
              digitalWrite(disableTJP, HIGH);
            }
   }
           
    
 }
 
