package com.bookmarks.bookmarks.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain
import kotlin.jvm.Throws

@Configuration
class SecurityConfig {
    @Bean
    @Throws(Exception::class)
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http.authorizeHttpRequests { authorize ->
            authorize
                .requestMatchers("/api/v1/properties").permitAll()
                .anyRequest().authenticated()
        }.oauth2ResourceServer { configurer ->
            configurer.jwt(Customizer.withDefaults())
        }

        return http.build()
    }
}