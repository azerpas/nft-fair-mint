async function main() {
    const nft = await ethers.getContractFactory("azerpas")
    const response = await nft.deploy()
    console.log("Contract deployed to address:", response.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })