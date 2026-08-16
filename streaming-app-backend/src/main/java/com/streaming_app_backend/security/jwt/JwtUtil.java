package com.streaming_app_backend.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil{

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long ExpireInSeconds;


    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    //Token generation

    public String generateToken(String username){
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + ExpireInSeconds))
                .signWith(getSecretKey())
                .compact();
    }

    //validate Token

    // we check the token can sign by our key

    public String extractUsername(String token){
      return  extractClaims(token).getSubject();
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String username,String token, UserDetails userDetails) {

        //TODO check if username is same as username in userDetails
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token) );
    }

        //TODO check id token is not expired
    private boolean isTokenExpired(String token) {
         return extractClaims(token).getExpiration().before(new Date());
    }

    //Token Validation


}
