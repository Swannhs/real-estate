describe('Home Page', () => {
  it('should load the home page successfully', () => {
    cy.visit('/');
    // Check if the main banner exists
    cy.get('.nc-PageHome2').should('exist');

    // Check if the search form exists (using the data-nc-id or class we added/expect)
    // Note: Since I can't run the app to check exact selectors, I'm inferring from code I saw earlier.
    // Ideally we would add data-testid attributes.
    cy.contains('Search').should('exist');
  });

  it('should navigate to search page when search is submitted', () => {
    cy.visit('/');
    // Assuming the search button has type="submit" and 'Search' text
    cy.get('button[type="submit"]').contains('Search').click();

    // Should navigate to /search
    cy.url().should('include', '/search');
  });
});
