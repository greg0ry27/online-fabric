package com.of.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Currency.
 */
@Entity
@Table(name = "currency")
public class Currency implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 2, max = 2)
    @Column(name = "code", length = 2, nullable = false)
    private String code;

    @NotNull
    @Size(max = 64)
    @Column(name = "name", length = 64, nullable = false)
    private String name;

    @Size(max = 512)
    @Column(name = "description", length = 512)
    private String description;

    @Column(name = "settings")
    private String settings;

    @OneToMany(mappedBy = "currency")
    private Set<PlayerCurrency> playerCurrencies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Currency code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public Currency name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Currency description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSettings() {
        return settings;
    }

    public Currency settings(String settings) {
        this.settings = settings;
        return this;
    }

    public void setSettings(String settings) {
        this.settings = settings;
    }

    public Set<PlayerCurrency> getPlayerCurrencies() {
        return playerCurrencies;
    }

    public Currency playerCurrencies(Set<PlayerCurrency> playerCurrencies) {
        this.playerCurrencies = playerCurrencies;
        return this;
    }

    public Currency addPlayerCurrency(PlayerCurrency playerCurrency) {
        this.playerCurrencies.add(playerCurrency);
        playerCurrency.setCurrency(this);
        return this;
    }

    public Currency removePlayerCurrency(PlayerCurrency playerCurrency) {
        this.playerCurrencies.remove(playerCurrency);
        playerCurrency.setCurrency(null);
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
        if (!(o instanceof Currency)) {
            return false;
        }
        return id != null && id.equals(((Currency) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Currency{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", settings='" + getSettings() + "'" +
            "}";
    }
}
