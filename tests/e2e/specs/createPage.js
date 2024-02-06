describe("Create Page", () => {
  it("connect to DApp with Metamask extension example", () => {
    cy.addMetamaskNetwork({
      networkName: "Mumbai",
      rpcUrl: "https://rpc-mumbai.maticvigil.com",
      chainId: "80001",
      symbol: "MATIC",
      blockExplorer: "https://mumbai.polygonscan.com",
      isTestnet: true,
    });

    cy.changeMetamaskNetwork("Mumbai");

    cy.visit("http://localhost:8080");

    cy.acceptMetamaskAccess();

    const collectionName = "TestCollection";
    const collectionSymbol = "TC";
    const collectionTokenURI = "https://example.com/token/1";

    cy.get('[placeholder="Enter collection name"]').type(collectionName);
    cy.get('[placeholder="Enter collection symbol"]').type(collectionSymbol);
    cy.get('[placeholder="Enter collection token URI"]').type(
      collectionTokenURI
    );
    cy.contains('[class="btn btn-primary"]', "Create").click();
    cy.confirmMetamaskTransaction();

    cy.contains(".list-group-item", "Collection Created", {
      timeout: 120000,
    }).should("exist");
    cy.get(".list-group-item")
      .first()
      .invoke("text")
      .then((text) => {
        const createdAddress = /address: (0x[a-fA-F0-9]{40})/.exec(text)[1];
        const createdName = /name: (\w+)/.exec(text)[1];
        const createdSymbol = /symbol: (\w+)/.exec(text)[1];

        const mintedCollectionAddress = createdAddress;
        const mintedRecipientAddress =
          "0x9254FeA57eE6cEA4E39502B949C9256e751e2737";
        const mintedTokenId = "22";

        cy.get('[placeholder="Enter collection address"]').type(
          mintedCollectionAddress
        );
        cy.get('[placeholder="Enter recipient address"]').type(
          mintedRecipientAddress
        );
        cy.get('[placeholder="Enter token id"]').type(mintedTokenId);
        cy.contains('[class="btn btn-primary"]', "Mint").click();
        cy.confirmMetamaskTransaction();

        cy.contains(".list-group-item", "NFT minted", {
          timeout: 120000,
        }).should("exist");
      });
  });
});
