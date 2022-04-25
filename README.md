# Doodle Jump on the Blockchain - Group 4 | Nike    


This project was created in the scope of the course "Blockchains and Overlay Networks" as a Challenge Task project at
the University of Zurich in spring semester 2022. 

Team: Silke Chen, Shuyue Wang, Yiwen Wang, Dean Heizmann, Dimitri Degkwitz, Reto Odoni

## Deployment 

### 1. Create a local blockchain with ganache. 

Installation informations can be found [here](https://github.com/trufflesuite/ganache).

``sudo ganache-cli``

When ganache starts running it shows all available accounts. Choose one address from the  **"Available Accounts"** section (e.g. *0xA084a3261289aB31Ee2F96223a64e09A93f39Cb7*)

### 2. Deploy "doodleJump.sol" on https://remix.ethereum.org

2.1 Copy the content from "/Doodle-Jump-in-JS/doodleJump.sol" in a file in the file explorer from https://remix.ethereum.org. See the image below.

![Screenshot from 2022-04-24 09-52-13](https://user-images.githubusercontent.com/10309173/164966142-3131dfe9-dfb9-4d2d-b81b-3c1bf8161e15.png)

2.2 Do not forget to compile the file with Ctrl+S or by switching to the compile tab. 

2.3 Switch to the deployment tab and change the Environment to Web3 Provider 

![Screenshot from 2022-04-25 13-49-39](https://user-images.githubusercontent.com/10309173/165083529-7bfdf786-4902-4284-a0e7-4fb26388c5b4.png)

2.4 Deploy the contract by copying the contract address. See image below:

![Screenshot from 2022-04-24 09-58-44](https://user-images.githubusercontent.com/10309173/164966431-da743b2f-b185-40de-a1d3-bd343efa8540.png)

### 3. Paste copied contact address into /Doodle-Jump-in-JS/src/player.js

![Screenshot from 2022-04-24 10-03-16](https://user-images.githubusercontent.com/10309173/164966556-70c295ca-43ac-41c0-91f4-73b5a0ce98a3.png)

### 4. Start game and enjoy 

Open "/index.html" with a web browser. You will be asked for the valet address from step 1.

## Other Informations

### Highscore

When you reach a new highscore, the score will be written on the blockchain. Right now it can only be read via https://remix.ethereum.org. 

![Screenshot from 2022-04-24 10-07-43](https://user-images.githubusercontent.com/10309173/164966799-ae59c39a-ac9a-42b4-9fee-88c2871586d5.png)

