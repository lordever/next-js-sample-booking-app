package com.bookmarks.bookmarks.repository

import com.bookmarks.bookmarks.entities.Location
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface LocationRepository : JpaRepository<Location, UUID> {
    fun findByCity(city: String): List<Location>
    fun findByFullAddressContaining(fullAddress: String): List<Location>
}