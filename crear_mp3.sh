curl http://www.esperanto.es:8080/diccionario/pdia_alexa.jsp > /home/masanpar/alexa/sonido.sh
/home/masanpar/alexa/sonido.sh
ffmpeg -y -i /home/masanpar/alexa/input.mp3 -ar 16000 -ab 48k -codec:a libmp3lame -ac 1 /home/masanpar/alexa/saluton.mp3
