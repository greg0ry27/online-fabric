package com.of.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Item.
 */
@Entity
@Table(name = "item")
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 3, max = 64)
    @Column(name = "name", length = 64, nullable = false)
    private String name;

    @Size(max = 512)
    @Column(name = "description", length = 512)
    private String description;

    @Column(name = "settings")
    private String settings;

    @OneToMany(mappedBy = "item")
    private Set<InventorySlot> inventorySlots = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("items")
    private ItemGroup itemGroup;

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

    public Item name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Item description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSettings() {
        return settings;
    }

    public Item settings(String settings) {
        this.settings = settings;
        return this;
    }

    public void setSettings(String settings) {
        this.settings = settings;
    }

    public Set<InventorySlot> getInventorySlots() {
        return inventorySlots;
    }

    public Item inventorySlots(Set<InventorySlot> inventorySlots) {
        this.inventorySlots = inventorySlots;
        return this;
    }

    public Item addInventorySlot(InventorySlot inventorySlot) {
        this.inventorySlots.add(inventorySlot);
        inventorySlot.setItem(this);
        return this;
    }

    public Item removeInventorySlot(InventorySlot inventorySlot) {
        this.inventorySlots.remove(inventorySlot);
        inventorySlot.setItem(null);
        return this;
    }

    public void setInventorySlots(Set<InventorySlot> inventorySlots) {
        this.inventorySlots = inventorySlots;
    }

    public ItemGroup getItemGroup() {
        return itemGroup;
    }

    public Item itemGroup(ItemGroup itemGroup) {
        this.itemGroup = itemGroup;
        return this;
    }

    public void setItemGroup(ItemGroup itemGroup) {
        this.itemGroup = itemGroup;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Item)) {
            return false;
        }
        return id != null && id.equals(((Item) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Item{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", settings='" + getSettings() + "'" +
            "}";
    }
}
