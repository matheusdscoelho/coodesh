describe("Radio Station App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load and display the sidebar, app bar, and card components", () => {
    cy.get("[data-testid=toggle-drawer-button]").click();
    cy.get("[data-testid=app-bar]").should("be.visible");
    cy.get("[data-testid=main-card]").should("be.visible");
  });

  it("should allow the user to search and add a station to favorites", () => {
    cy.get("[data-testid=search-input]").type("jazz");
    cy.get("[data-testid=station-name-40e0da97-9fd2-4729-8e86-4c65cdba7910]")
      .should("be.visible")
      .click();
    cy.get("[data-testid=toggle-drawer-button]").click();
    cy.get("[data-testid=station-card]").each(($station) => {
      cy.wrap($station).should("contain.text", "jazz").and("be.visible");
    });
  });

  it("should allow the user to play and pause a station", () => {
    cy.get("[data-testid=search-input]").type("jazz");
    cy.get("[data-testid=station-name-40e0da97-9fd2-4729-8e86-4c65cdba7910]")
      .should("be.visible")
      .click();
    cy.get("[data-testid=toggle-drawer-button]").click();
    cy.get("[data-testid=station-card]").each(($station) => {
      cy.wrap($station).should("contain.text", "jazz").and("be.visible");
    });
    cy.get("[data-testid=station-card]")
      .first()
      .within(() => {
        cy.get("[data-testid=play-stop-button]").click();
      });
    cy.get("[data-testid=currently-playing-text]").should(
      "contain.text",
      "Tocando -  A Fine Jazz Gumbo Radio"
    );
    cy.wait(2000);

    cy.get("[data-testid=play-stop-button]").click();
    cy.get("[data-testid=currently-playing-text]").should(
      "not.contain.text",
      "Tocando -  A Fine Jazz Gumbo Radio"
    );
  });

  it("should allow the user to remove a station from favorites", () => {
    cy.get("[data-testid=station-name-7fe99458-b6f2-4af0-95bc-e05977964622]")
      .should("be.visible")
      .click();
    cy.get("[data-testid=station-name-9d69cc77-b698-40c0-8036-17cd1f09ca44]")
      .should("be.visible")
      .click();
    cy.get("[data-testid=station-name-98152a6d-9a3d-46d7-8019-c8c03f29be38]")
      .should("be.visible")
      .click();

    cy.get("[data-testid=toggle-drawer-button]").click();

    cy.get(
      "[data-testid=music-style-card-7fe99458-b6f2-4af0-95bc-e05977964622]"
    )
      .first()
      .within(() => {
        cy.get("[data-testid=delete-button]").click();
      });

    cy.get(
      "[data-testid=music-style-card-7fe99458-b6f2-4af0-95bc-e05977964622]"
    ).should("not.exist");
  });

  it("should allow the user to edit a station from favorites", () => {
    cy.get("[data-testid=station-name-7fe99458-b6f2-4af0-95bc-e05977964622]")
      .should("be.visible")
      .click();
    cy.get("[data-testid=station-name-9d69cc77-b698-40c0-8036-17cd1f09ca44]")
      .should("be.visible")
      .click();
    cy.get("[data-testid=station-name-98152a6d-9a3d-46d7-8019-c8c03f29be38]")
      .should("be.visible")
      .click();

    cy.get("[data-testid=toggle-drawer-button]").click();

    cy.get(
      "[data-testid=music-style-card-7fe99458-b6f2-4af0-95bc-e05977964622]"
    )
      .first()
      .within(() => {
        cy.get("[data-testid=edit-button]").click();
      });

    cy.get("[data-testid=edit-station-dialog]").should("exist");

    cy.get("[data-testid=station-name-input]").type(" Test");
    cy.get("[data-testid=station-country-input]").type(" Test");
    cy.get("[data-testid=station-votes-input]").type("12");

    cy.get("[data-testid=save-button]").should("exist").click();

    cy.get(
      "[data-testid=music-style-card-7fe99458-b6f2-4af0-95bc-e05977964622]"
    )
      .first()
      .within(() => {
        cy.get("[data-testid=station-name]").should(
          "contain.text",
          "BBC Radio 5 Live Proper Test"
        );
        cy.get("[data-testid=station-info]").should(
          "contain.text",
          "The United Kingdom Of Great Britain And Northern Ireland Test,"
        );
      });
  });
});
