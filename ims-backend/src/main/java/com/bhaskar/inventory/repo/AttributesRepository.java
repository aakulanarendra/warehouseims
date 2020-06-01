package com.bhaskar.inventory.repo;

import com.bhaskar.inventory.collection.Attributes;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttributesRepository extends MongoRepository<Attributes,String> {
}
