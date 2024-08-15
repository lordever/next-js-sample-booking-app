package com.bookmarks.bookmarks.entities

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.annotations.UpdateTimestamp
import org.hibernate.type.SqlTypes
import java.time.LocalDateTime
import java.util.*

@Entity
data class Property(
    var type: String? = null,
    var name: String? = null,
    var owner: String? = null,
    var description: String? = null,
    var beds: Int? = null,
    var baths: Int? = null,
    var squareFeet: Int? = null,

    @field:Id
    @field:GeneratedValue(generator = "UUID")
    @field:JdbcTypeCode(SqlTypes.CHAR)
    @field:Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false)
    var id: UUID? = null,

    @field:CreationTimestamp
    @field:Column(updatable = false)
    var createDate: LocalDateTime? = null,

    @field:UpdateTimestamp
    var lastModifiedDate: LocalDateTime? = null,

    @field:ManyToOne
    var rates: Rate? = null,

    @field:ManyToOne
    var location: Location? = null
) {
    @field:OneToMany(mappedBy = "property")
    var images: MutableSet<Image>? = mutableSetOf()

    @field:OneToMany(mappedBy = "property")
    var amenities: MutableSet<Amenities>? = mutableSetOf()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || javaClass != other.javaClass) return false

        other as Property

        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    fun assignRate(rate: Rate) {
        this.rates = rate
        rate.property?.add(this)
    }

    fun assignLocation(location: Location) {
        this.location = location
        location.property?.add(this)
    }
}