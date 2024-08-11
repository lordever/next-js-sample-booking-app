package com.bookmarks.bookmarks.entities

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany
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

    @field:OneToMany(mappedBy = "property")
    var rates: Set<Rate>? = null,

    @field:OneToMany(mappedBy = "property")
    var locations: Set<Location>? = null,

    @field:OneToMany(mappedBy = "property")
    var images: Set<Image>? = null,

    @field:OneToMany(mappedBy = "property")
    var amenities: Set<Amenities>? = null,
)