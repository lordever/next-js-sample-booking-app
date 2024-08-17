package com.bookmarks.bookmarks.services

import com.bookmarks.bookmarks.entities.Location
import com.bookmarks.bookmarks.entities.Property
import com.bookmarks.bookmarks.mappers.PropertyMapper
import com.bookmarks.bookmarks.models.dto.PropertyDTO
import com.bookmarks.bookmarks.repository.PropertyRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import org.springframework.util.StringUtils
import java.util.*

@Service
class PropertyServiceImpl(
    private val propertyRepository: PropertyRepository,
    private val propertyMapper: PropertyMapper,
    private val locationService: LocationService
) : PropertyService {

    companion object {
        const val DEFAULT_PAGE = 0
        const val DEFAULT_PAGE_SIZE = 5
    }

    override fun findAll(city: String?, type: String?, pageNumber: Int?, pageSize: Int?): Page<PropertyDTO> {
        val pageRequest = buildPageRequest(pageNumber, pageSize)

        val propertyPage: Page<Property> =
            if (type != null && city != null) {
                listPropertiesByCityAndType(city, type, pageRequest)
            } else
                if (type == null && city != null && StringUtils.hasText(city)) {
                    listPropertiesByCity(city, pageRequest)
                } else
                    if (city == null && type != null) {
                        listPropertiesByType(type, pageRequest)
                    } else {
                        propertyRepository.findAll(pageRequest)
                    }

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

    private fun listPropertiesByType(type: String, pageable: Pageable?): Page<Property> {
        return propertyRepository.findAllByType(type, pageable)
    }

    private fun listPropertiesByCity(city: String, pageable: Pageable?): Page<Property> {
        val locationsByCity: List<Location> = locationService.findByCity(city)
        return propertyRepository.findAllByLocationIn(locationsByCity, pageable)
    }

    private fun listPropertiesByCityAndType(city: String, type: String, pageable: Pageable?): Page<Property> {
        val locationsByCity: List<Location> = locationService.findByCity(city)
        return propertyRepository.findAllByLocationInAndType(locationsByCity, type, pageable)
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