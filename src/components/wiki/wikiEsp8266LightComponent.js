import React from 'react';
import hljs from 'highlight.js/lib/highlight';
import python from 'highlight.js/lib/languages/python';

class WikiEsp8266Light extends React.Component {
    componentDidMount() {
        hljs.registerLanguage('python', python);
        hljs.highlightBlock(this.refs.highlight);
    }

    render() {
        return (
            <div className="background-content">
                <div className="container content-background">
                    <h3 className="text-center">ESP8266 remote light switcher</h3>
                    <h5>Code for ESP8266</h5>
                    <div ref="highlight">
                        <pre>
                            <code>
                                {`
#include <ESP8266WiFi.h>
 
const char* ssid = ""; // fill in here your router or wifi SSID
const char* password = ""; // fill in here your router or wifi password
 #define RELAY 0 // relay connected to  GPIO0
WiFiServer server(80);
 
void setup() 
{
  Serial.begin(115200); // must be same baudrate with the Serial Monitor
 
  pinMode(RELAY,OUTPUT);
  digitalWrite(RELAY, LOW);
 
  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
 
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
 
  // Start the server
  server.begin();
  Serial.println("Server started");
 
  // Print the IP address
  Serial.print("Use this URL to connect: ");
  Serial.print("https://192.168.0.178/");
  Serial.print(WiFi.localIP());
  Serial.println("/");
 
}
 
void loop() 
{
  // Check if a client has connected
  WiFiClient client = server.available();
  if (!client) 
  {
    return;
  }
 
  // Wait until the client sends some data
  Serial.println("new client");
  while(!client.available())
  {
    delay(1);
  }

  // Read the first line of the request
  String request = client.readStringUntil('\r');
  Serial.println(request);
  client.flush();
 
  // Match the request
  int value = LOW;
  if (request.indexOf("/switch") != -1)  
  {
    int currentValue = digitalRead(RELAY);
    if (currentValue == LOW)
    {
      value = HIGH;
    }
    else
    {
      value = LOW;
    }
    value = !currentValue;
    digitalWrite(RELAY,value);
    Serial.println("Switched to: ");
    Serial.print(value);
  }
  
  // Return the response
  client.print("Relay is now: ");
 
  if(value == HIGH) 
  {
    client.print("OFF");
  } 
  else 
  {
    client.print("ON");
  }
 
  delay(1);
  Serial.println("Client disonnected");
  Serial.println("");
}
                                `}
                            </code>
                        </pre>
                    </div>
                    <h5>Code for a new item:</h5>
                    <div ref="highlight">
                        <pre>
                            <code>
                                {`
from urllib2 import urlopen

r = urlopen('http://192.168.100.18/switched')
print(r.read())
                                `}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

export { WikiEsp8266Light };