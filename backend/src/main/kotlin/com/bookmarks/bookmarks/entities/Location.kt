package com.bookmarks.bookmarks.entities

import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import java.util.*

@Entity
data class Location(
    var city: String? = null,
    var street: String? = null,
    var state: String? = null,
    var zipcode: String? = null,

    @field:Id
    @field:GeneratedValue(generator = "UUID")
    @field:JdbcTypeCode(SqlTypes.CHAR)
    @field:Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false)
    var id: UUID? = null,

    @Column(name = "full_address")
    val fullAddress: String? = null,
) {
    @field:OneToMany(mappedBy = "location", cascade = [(CascadeType.ALL)], fetch = FetchType.EAGER, orphanRemoval = true)
    var property: MutableSet<Property>? = mutableSetOf()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || javaClass != other.javaClass) return false

        other as Location

        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }
}