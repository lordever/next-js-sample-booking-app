package com.bookmarks.bookmarks.repository

import com.bookmarks.bookmarks.entities.Property
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface PropertyRepository : JpaRepository<Property, UUID> {
    fun findAllByType(type: String, pageable: Pageable?): Page<Property>

    @Query("SELECT p FROM Property p WHERE (:street IS NULL OR p.location.street LIKE %:street%) AND (:city IS NULL OR p.location.city LIKE %:city%) AND (:state IS NULL OR p.location.state LIKE %:state%) AND (:zipcode IS NULL OR p.location.zipcode LIKE %:zipcode%)")
    fun findAllByLocation(
        @Param("street") street: String?,
        @Param("city") city: String?,
        @Param("state") state: String?,
        @Param("zipcode") zipcode: String?,
        pageable: Pageable?
    ): Page<Property>
}