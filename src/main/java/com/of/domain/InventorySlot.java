package com.of.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A InventorySlot.
 */
@Entity
@Table(name = "inventory_slot")
public class InventorySlot implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Min(value = 0)
    @Column(name = "slot", nullable = false)
    private Integer slot;

    @NotNull
    @Min(value = 1)
    @Column(name = "amount", nullable = false)
    private Integer amount;

    @ManyToOne
    @JsonIgnoreProperties("inventorySlots")
    private Item item;

    @ManyToOne
    @JsonIgnoreProperties("inventorySlots")
    private Inventory inventory;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSlot() {
        return slot;
    }

    public InventorySlot slot(Integer slot) {
        this.slot = slot;
        return this;
    }

    public void setSlot(Integer slot) {
        this.slot = slot;
    }

    public Integer getAmount() {
        return amount;
    }

    public InventorySlot amount(Integer amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Item getItem() {
        return item;
    }

    public InventorySlot item(Item item) {
        this.item = item;
        return this;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public InventorySlot inventory(Inventory inventory) {
        this.inventory = inventory;
        return this;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InventorySlot)) {
            return false;
        }
        return id != null && id.equals(((InventorySlot) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "InventorySlot{" +
            "id=" + getId() +
            ", slot=" + getSlot() +
            ", amount=" + getAmount() +
            "}";
    }
}
