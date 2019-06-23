package com.of.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Inventory.
 */
@Entity
@Table(name = "inventory")
public class Inventory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 3, max = 64)
    @Column(name = "type", length = 64, nullable = false)
    private String type;

    @Column(name = "settings")
    private String settings;

    @OneToMany(mappedBy = "inventory")
    private Set<InventorySlot> inventorySlots = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("inventories")
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

    public Inventory type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSettings() {
        return settings;
    }

    public Inventory settings(String settings) {
        this.settings = settings;
        return this;
    }

    public void setSettings(String settings) {
        this.settings = settings;
    }

    public Set<InventorySlot> getInventorySlots() {
        return inventorySlots;
    }

    public Inventory inventorySlots(Set<InventorySlot> inventorySlots) {
        this.inventorySlots = inventorySlots;
        return this;
    }

    public Inventory addInventorySlot(InventorySlot inventorySlot) {
        this.inventorySlots.add(inventorySlot);
        inventorySlot.setInventory(this);
        return this;
    }

    public Inventory removeInventorySlot(InventorySlot inventorySlot) {
        this.inventorySlots.remove(inventorySlot);
        inventorySlot.setInventory(null);
        return this;
    }

    public void setInventorySlots(Set<InventorySlot> inventorySlots) {
        this.inventorySlots = inventorySlots;
    }

    public Player getPlayer() {
        return player;
    }

    public Inventory player(Player player) {
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
        if (!(o instanceof Inventory)) {
            return false;
        }
        return id != null && id.equals(((Inventory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Inventory{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", settings='" + getSettings() + "'" +
            "}";
    }
}
