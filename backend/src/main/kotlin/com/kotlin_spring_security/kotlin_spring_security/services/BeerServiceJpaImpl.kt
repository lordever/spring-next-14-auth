package com.kotlin_spring_security.kotlin_spring_security.services

import com.kotlin_spring_security.kotlin_spring_security.mappers.BeerMapper
import com.kotlin_spring_security.kotlin_spring_security.models.BeerDTO
import com.kotlin_spring_security.kotlin_spring_security.repositories.BeerRepository
import org.springframework.context.annotation.Primary
import org.springframework.stereotype.Service
import org.springframework.util.StringUtils
import java.util.*

@Primary
@Service
class BeerServiceJpaImpl(
    private val beerRepository: BeerRepository,
    private val beerMapper: BeerMapper
) : BeerService {
    override fun getBeerById(id: UUID): BeerDTO? =
        beerRepository.findById(id).map(beerMapper::toDto).orElse(null)

    override fun listBeer(): List<BeerDTO> = beerRepository.findAll().map(beerMapper::toDto)

    override fun save(beerDTO: BeerDTO): BeerDTO =
        beerMapper
            .toDto(
                beerRepository.save(
                    beerMapper.toBeer(beerDTO)
                )
            )

    override fun updateById(id: UUID, newBeerDTO: BeerDTO): BeerDTO? {
        return beerRepository.findById(id).map { foundBeer ->
            foundBeer.apply {
                name = newBeerDTO.name
                style = newBeerDTO.style
                upc = newBeerDTO.upc
                price = newBeerDTO.price
                quantity = newBeerDTO.quantity
            }
            beerMapper.toDto(beerRepository.save(foundBeer))
        }.orElse(null)
    }

    override fun patchById(id: UUID, newBeerDTO: BeerDTO): BeerDTO? {
        return beerRepository.findById(id).map { foundBeer ->
            if (StringUtils.hasText(newBeerDTO.name)) {
                foundBeer.name = newBeerDTO.name
            }

            if (newBeerDTO.upc != null) {
                foundBeer.upc = newBeerDTO.upc
            }

            if (newBeerDTO.price != null) {
                foundBeer.price = newBeerDTO.price
            }

            if (newBeerDTO.style != null) {
                foundBeer.style = newBeerDTO.style
            }

            if (newBeerDTO.quantity != null) {
                foundBeer.quantity = newBeerDTO.quantity
            }

            beerMapper.toDto(beerRepository.save(foundBeer))
        }.orElse(null)
    }

    override fun deleteById(id: UUID): Boolean {
        if (beerRepository.existsById(id)) {
            beerRepository.deleteById(id)
            return true
        }

        return false
    }
}