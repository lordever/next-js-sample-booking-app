package com.bookmarks.bookmarks.entities

import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import java.util.*

@Entity
data class Rate(
    var monthly: Int? = null,
    var weekly: Int? = null,
    var nightly: Int? = null,

    @field:Id
    @field:GeneratedValue(generator = "UUID")
    @field:JdbcTypeCode(SqlTypes.CHAR)
    @field:Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false)
    var id: UUID? = null,
) {
    @field:OneToMany(mappedBy = "rates", cascade = [(CascadeType.ALL)], fetch = FetchType.EAGER, orphanRemoval = true)
    var property: MutableSet<Property>? = mutableSetOf()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || javaClass != other.javaClass) return false

        other as Rate

        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }
}