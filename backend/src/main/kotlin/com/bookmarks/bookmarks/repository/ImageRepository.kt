package com.bookmarks.bookmarks.repository

import com.bookmarks.bookmarks.entities.Image
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ImageRepository : JpaRepository<Image, UUID> {
}