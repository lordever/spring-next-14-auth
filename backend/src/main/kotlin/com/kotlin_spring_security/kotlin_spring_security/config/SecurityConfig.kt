package com.kotlin_spring_security.kotlin_spring_security.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
class SecurityConfig {
    @Bean
    @Throws(Exception::class)
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http.authorizeHttpRequests { authorize ->
            authorize
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
        }.oauth2ResourceServer { configurer ->
            configurer.jwt(Customizer.withDefaults())
        }

        return http.build()
    }
}