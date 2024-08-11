package com.bookmarks.bookmarks.repository

import com.bookmarks.bookmarks.entities.Amenities
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface AmenitiesRepository : JpaRepository<Amenities, UUID> {
}