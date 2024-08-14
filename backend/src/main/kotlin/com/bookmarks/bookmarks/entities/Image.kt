package com.bookmarks.bookmarks.entities

import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import java.util.*

@Entity
data class Image(
    var url: String? = null,

    @field:Id
    @field:GeneratedValue(generator = "UUID")
    @field:JdbcTypeCode(SqlTypes.CHAR)
    @field:Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false)
    var id: UUID? = null,

    @field:ManyToOne
    var property: Property? = null
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || javaClass != other.javaClass) return false

        other as Image

        if (id != null && other.id != null) {
            return id == other.id
        }

        return url == other.url
    }

    override fun hashCode(): Int {
        return id?.hashCode() ?: (url?.hashCode() ?: 0)
    }

    fun assignProperty(property: Property) {
        this.property = property
        property.images?.add(this)
    }
}