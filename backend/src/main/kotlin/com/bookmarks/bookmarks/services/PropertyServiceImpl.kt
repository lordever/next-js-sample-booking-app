package com.bookmarks.bookmarks.services

import com.bookmarks.bookmarks.models.dto.PropertyDTO
import org.springframework.stereotype.Service
import java.util.*

@Service
class PropertyServiceImpl: PropertyService {
    override fun findAll(): List<PropertyDTO> {
        TODO("Not yet implemented")
    }

    override fun findById(id: UUID): PropertyDTO {
        TODO("Not yet implemented")
    }

    override fun create(property: PropertyDTO): PropertyDTO {
        TODO("Not yet implemented")
    }

    override fun updateById(id: UUID, property: PropertyDTO): PropertyDTO {
        TODO("Not yet implemented")
    }

    override fun delete(id: UUID): Boolean {
        TODO("Not yet implemented")
    }
}