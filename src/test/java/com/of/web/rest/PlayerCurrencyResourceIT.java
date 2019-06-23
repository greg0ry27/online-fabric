package com.of.web.rest;

import com.of.OnlineFabricApp;
import com.of.domain.PlayerCurrency;
import com.of.repository.PlayerCurrencyRepository;
import com.of.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.of.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link PlayerCurrencyResource} REST controller.
 */
@SpringBootTest(classes = OnlineFabricApp.class)
public class PlayerCurrencyResourceIT {

    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;

    @Autowired
    private PlayerCurrencyRepository playerCurrencyRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPlayerCurrencyMockMvc;

    private PlayerCurrency playerCurrency;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlayerCurrencyResource playerCurrencyResource = new PlayerCurrencyResource(playerCurrencyRepository);
        this.restPlayerCurrencyMockMvc = MockMvcBuilders.standaloneSetup(playerCurrencyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlayerCurrency createEntity(EntityManager em) {
        PlayerCurrency playerCurrency = new PlayerCurrency()
            .amount(DEFAULT_AMOUNT);
        return playerCurrency;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlayerCurrency createUpdatedEntity(EntityManager em) {
        PlayerCurrency playerCurrency = new PlayerCurrency()
            .amount(UPDATED_AMOUNT);
        return playerCurrency;
    }

    @BeforeEach
    public void initTest() {
        playerCurrency = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlayerCurrency() throws Exception {
        int databaseSizeBeforeCreate = playerCurrencyRepository.findAll().size();

        // Create the PlayerCurrency
        restPlayerCurrencyMockMvc.perform(post("/api/player-currencies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playerCurrency)))
            .andExpect(status().isCreated());

        // Validate the PlayerCurrency in the database
        List<PlayerCurrency> playerCurrencyList = playerCurrencyRepository.findAll();
        assertThat(playerCurrencyList).hasSize(databaseSizeBeforeCreate + 1);
        PlayerCurrency testPlayerCurrency = playerCurrencyList.get(playerCurrencyList.size() - 1);
        assertThat(testPlayerCurrency.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createPlayerCurrencyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = playerCurrencyRepository.findAll().size();

        // Create the PlayerCurrency with an existing ID
        playerCurrency.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlayerCurrencyMockMvc.perform(post("/api/player-currencies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playerCurrency)))
            .andExpect(status().isBadRequest());

        // Validate the PlayerCurrency in the database
        List<PlayerCurrency> playerCurrencyList = playerCurrencyRepository.findAll();
        assertThat(playerCurrencyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = playerCurrencyRepository.findAll().size();
        // set the field null
        playerCurrency.setAmount(null);

        // Create the PlayerCurrency, which fails.

        restPlayerCurrencyMockMvc.perform(post("/api/player-currencies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playerCurrency)))
            .andExpect(status().isBadRequest());

        List<PlayerCurrency> playerCurrencyList = playerCurrencyRepository.findAll();
        assertThat(playerCurrencyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPlayerCurrencies() throws Exception {
        // Initialize the database
        playerCurrencyRepository.saveAndFlush(playerCurrency);

        // Get all the playerCurrencyList
        restPlayerCurrencyMockMvc.perform(get("/api/player-currencies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(playerCurrency.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)));
    }
    
    @Test
    @Transactional
    public void getPlayerCurrency() throws Exception {
        // Initialize the database
        playerCurrencyRepository.saveAndFlush(playerCurrency);

        // Get the playerCurrency
        restPlayerCurrencyMockMvc.perform(get("/api/player-currencies/{id}", playerCurrency.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(playerCurrency.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT));
    }

    @Test
    @Transactional
    public void getNonExistingPlayerCurrency() throws Exception {
        // Get the playerCurrency
        restPlayerCurrencyMockMvc.perform(get("/api/player-currencies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlayerCurrency() throws Exception {
        // Initialize the database
        playerCurrencyRepository.saveAndFlush(playerCurrency);

        int databaseSizeBeforeUpdate = playerCurrencyRepository.findAll().size();

        // Update the playerCurrency
        PlayerCurrency updatedPlayerCurrency = playerCurrencyRepository.findById(playerCurrency.getId()).get();
        // Disconnect from session so that the updates on updatedPlayerCurrency are not directly saved in db
        em.detach(updatedPlayerCurrency);
        updatedPlayerCurrency
            .amount(UPDATED_AMOUNT);

        restPlayerCurrencyMockMvc.perform(put("/api/player-currencies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlayerCurrency)))
            .andExpect(status().isOk());

        // Validate the PlayerCurrency in the database
        List<PlayerCurrency> playerCurrencyList = playerCurrencyRepository.findAll();
        assertThat(playerCurrencyList).hasSize(databaseSizeBeforeUpdate);
        PlayerCurrency testPlayerCurrency = playerCurrencyList.get(playerCurrencyList.size() - 1);
        assertThat(testPlayerCurrency.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingPlayerCurrency() throws Exception {
        int databaseSizeBeforeUpdate = playerCurrencyRepository.findAll().size();

        // Create the PlayerCurrency

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlayerCurrencyMockMvc.perform(put("/api/player-currencies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playerCurrency)))
            .andExpect(status().isBadRequest());

        // Validate the PlayerCurrency in the database
        List<PlayerCurrency> playerCurrencyList = playerCurrencyRepository.findAll();
        assertThat(playerCurrencyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlayerCurrency() throws Exception {
        // Initialize the database
        playerCurrencyRepository.saveAndFlush(playerCurrency);

        int databaseSizeBeforeDelete = playerCurrencyRepository.findAll().size();

        // Delete the playerCurrency
        restPlayerCurrencyMockMvc.perform(delete("/api/player-currencies/{id}", playerCurrency.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlayerCurrency> playerCurrencyList = playerCurrencyRepository.findAll();
        assertThat(playerCurrencyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlayerCurrency.class);
        PlayerCurrency playerCurrency1 = new PlayerCurrency();
        playerCurrency1.setId(1L);
        PlayerCurrency playerCurrency2 = new PlayerCurrency();
        playerCurrency2.setId(playerCurrency1.getId());
        assertThat(playerCurrency1).isEqualTo(playerCurrency2);
        playerCurrency2.setId(2L);
        assertThat(playerCurrency1).isNotEqualTo(playerCurrency2);
        playerCurrency1.setId(null);
        assertThat(playerCurrency1).isNotEqualTo(playerCurrency2);
    }
}
