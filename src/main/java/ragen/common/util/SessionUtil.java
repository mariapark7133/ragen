package ragen.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import ragen.common.response.enums.ResponseCode;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;

import java.io.PrintWriter;
import java.util.UUID;

public class SessionUtil {
	public static String generateSessionToken() {
        return UUID.randomUUID().toString();
    }

    public static void reponseBody(HttpServletResponse response)  throws Exception {

        response.setStatus(HttpServletResponse.SC_FORBIDDEN); // Set the HTTP status code to 401 Unauthorized
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode jsonResponse = objectMapper.createObjectNode();
        jsonResponse.put("status", ResponseCode.SESSION_END.name());
        jsonResponse.put("code", ResponseCode.SESSION_END.getCode());
        jsonResponse.put("message", ResponseCode.SESSION_END.getMessage());
        PrintWriter writer = response.getWriter();
        writer.print(jsonResponse);
        writer.flush();
    }
}

