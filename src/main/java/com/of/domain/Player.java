package com.of.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Player.
 */
@Entity
@Table(name = "player")
public class Player implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 3, max = 64)
    @Column(name = "name", length = 64, nullable = false)
    private String name;

    @NotNull
    @Column(name = "last_login", nullable = false)
    private ZonedDateTime lastLogin;

    @NotNull
    @Column(name = "created", nullable = false)
    private ZonedDateTime created;

    @OneToMany(mappedBy = "player")
    private Set<Character> characters = new HashSet<>();

    @OneToMany(mappedBy = "player")
    private Set<Inventory> inventories = new HashSet<>();

    @OneToMany(mappedBy = "player")
    private Set<PlayerCurrency> playerCurrencies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Player name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getLastLogin() {
        return lastLogin;
    }

    public Player lastLogin(ZonedDateTime lastLogin) {
        this.lastLogin = lastLogin;
        return this;
    }

    public void setLastLogin(ZonedDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public Player created(ZonedDateTime created) {
        this.created = created;
        return this;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public Set<Character> getCharacters() {
        return characters;
    }

    public Player characters(Set<Character> characters) {
        this.characters = characters;
        return this;
    }

    public Player addCharacter(Character character) {
        this.characters.add(character);
        character.setPlayer(this);
        return this;
    }

    public Player removeCharacter(Character character) {
        this.characters.remove(character);
        character.setPlayer(null);
        return this;
    }

    public void setCharacters(Set<Character> characters) {
        this.characters = characters;
    }

    public Set<Inventory> getInventories() {
        return inventories;
    }

    public Player inventories(Set<Inventory> inventories) {
        this.inventories = inventories;
        return this;
    }

    public Player addInventory(Inventory inventory) {
        this.inventories.add(inventory);
        inventory.setPlayer(this);
        return this;
    }

    public Player removeInventory(Inventory inventory) {
        this.inventories.remove(inventory);
        inventory.setPlayer(null);
        return this;
    }

    public void setInventories(Set<Inventory> inventories) {
        this.inventories = inventories;
    }

    public Set<PlayerCurrency> getPlayerCurrencies() {
        return playerCurrencies;
    }

    public Player playerCurrencies(Set<PlayerCurrency> playerCurrencies) {
        this.playerCurrencies = playerCurrencies;
        return this;
    }

    public Player addPlayerCurrency(PlayerCurrency playerCurrency) {
        this.playerCurrencies.add(playerCurrency);
        playerCurrency.setPlayer(this);
        return this;
    }

    public Player removePlayerCurrency(PlayerCurrency playerCurrency) {
        this.playerCurrencies.remove(playerCurrency);
        playerCurrency.setPlayer(null);
        return this;
    }

    public void setPlayerCurrencies(Set<PlayerCurrency> playerCurrencies) {
        this.playerCurrencies = playerCurrencies;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Player)) {
            return false;
        }
        return id != null && id.equals(((Player) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Player{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", lastLogin='" + getLastLogin() + "'" +
            ", created='" + getCreated() + "'" +
            "}";
    }
}
