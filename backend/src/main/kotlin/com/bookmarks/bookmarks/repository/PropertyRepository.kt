package com.bookmarks.bookmarks.repository

import com.bookmarks.bookmarks.entities.Location
import com.bookmarks.bookmarks.entities.Property
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface PropertyRepository : JpaRepository<Property, UUID> {
    fun findAllByType(type: String, pageable: Pageable?): Page<Property>
    fun findAllByLocationIn(location: List<Location>, pageable: Pageable?): Page<Property>
}