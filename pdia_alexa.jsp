<%@ page language='java' contentType="text/html; charset=UTF-8" %><%@ page import="es.esperanto.diccionario.*"%><%@ page import="java.util.*"%><%
	BeanPalabra beanPalabra = Control.getPalabraAzar();
	List<BeanSignificado> significados = Control.getSignificados(beanPalabra.getId());
	String vorto = beanPalabra.getPalabra();
%>espeak -ves "<%=vorto.toLowerCase()%> en esperanto es:" --stdout >/home/masanpar/alexa/input.mp3 && espeak -veo "<% 
	int i=0;
	for (BeanSignificado b:significados){
		if (i++>=5) break;
%><%=Util.cambia(b.getTexto())%> <%	} %>" --stdout >>/home/masanpar/alexa/input.mp3