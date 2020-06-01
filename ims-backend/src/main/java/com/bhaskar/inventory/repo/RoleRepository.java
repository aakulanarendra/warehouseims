package com.bhaskar.inventory.repo;

import com.bhaskar.inventory.collection.Offer;
import com.bhaskar.inventory.collection.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends MongoRepository<Role,String> {
}
