package com.example.hasapp.security;

import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.savedrequest.NullRequestCache;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;


@Configuration
@ConditionalOnWebApplication
@EnableWebSecurity
public class SecurityConfig {

    private final JwtConverter jwtConverter;

    public SecurityConfig(JwtConverter jwtConverter) {
        this.jwtConverter = jwtConverter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationConfiguration authConfig) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((auth) -> auth
 /*                       .requestMatchers(new AntPathRequestMatcher("/api/login", "POST")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/register", "POST")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/refresh-token", "POST")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/dashboard", "GET")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/dashboard/*", "GET")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/dashboard", "POST")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/dashboard/*", "PUT")).authenticated()*/
                        .anyRequest().permitAll()
                )
                .addFilter(new JwtRequestFilter(authenticationManager(authConfig), jwtConverter))
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));


        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }


}
