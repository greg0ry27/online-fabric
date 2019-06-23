package com.of.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Character.
 */
@Entity
@Table(name = "character")
public class Character implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 3, max = 64)
    @Column(name = "type", length = 64, nullable = false)
    private String type;

    @NotNull
    @Column(name = "last_use", nullable = false)
    private ZonedDateTime lastUse;

    @NotNull
    @Column(name = "created", nullable = false)
    private ZonedDateTime created;

    @ManyToOne
    @JsonIgnoreProperties("characters")
    private Player player;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public Character type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public ZonedDateTime getLastUse() {
        return lastUse;
    }

    public Character lastUse(ZonedDateTime lastUse) {
        this.lastUse = lastUse;
        return this;
    }

    public void setLastUse(ZonedDateTime lastUse) {
        this.lastUse = lastUse;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public Character created(ZonedDateTime created) {
        this.created = created;
        return this;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public Player getPlayer() {
        return player;
    }

    public Character player(Player player) {
        this.player = player;
        return this;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Character)) {
            return false;
        }
        return id != null && id.equals(((Character) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Character{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", lastUse='" + getLastUse() + "'" +
            ", created='" + getCreated() + "'" +
            "}";
    }
}
