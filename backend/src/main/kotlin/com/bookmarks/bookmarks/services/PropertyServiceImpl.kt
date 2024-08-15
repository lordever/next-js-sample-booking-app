package com.bookmarks.bookmarks.services

import com.bookmarks.bookmarks.entities.Property
import com.bookmarks.bookmarks.mappers.PropertyMapper
import com.bookmarks.bookmarks.models.dto.PropertyDTO
import com.bookmarks.bookmarks.repository.PropertyRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.util.*

@Service
class PropertyServiceImpl(
    private val propertyRepository: PropertyRepository,
    private val propertyMapper: PropertyMapper
) : PropertyService {

    companion object {
        const val DEFAULT_PAGE = 0
        const val DEFAULT_PAGE_SIZE = 5
    }

    override fun findAll(location: String?, type: String?, pageNumber: Int?, pageSize: Int?): Page<PropertyDTO> {
        val pageRequest = buildPageRequest(pageNumber, pageSize)

        val propertyPage: Page<Property> = propertyRepository.findAll(pageRequest)

        return propertyPage.map(propertyMapper::toDTO)
    }

    private fun buildPageRequest(pageNumber: Int?, pageSize: Int?): PageRequest {
        var queryPageNumber: Int = DEFAULT_PAGE

        if (pageNumber != null) {
            if (pageNumber > 0) {
                queryPageNumber = pageNumber - 1
            }
        }

        val queryPageSize: Int
        if (pageSize == null) {
            queryPageSize = DEFAULT_PAGE_SIZE
        } else {
            if (pageSize > 1000) {
                queryPageSize = 1000
            } else {
                queryPageSize = pageSize
            }
        }

        val sort: Sort = Sort.by(Sort.Order.asc("name"))

        return PageRequest.of(queryPageNumber, queryPageSize, sort)
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