const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartButton");
const winConditions = [
    // peluang menang horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // peluang menang vertikal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // peluang menang garis miring
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""]; //tujuannya untuk mendeklarasikan tiap tiap coloumn pada game
let currentPlayer = "X";
let running = false; 
let scoreX = 0;
let scoreO = 0;
let history = [];

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); //untuk memulai game dengan mengklik class "cell"
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`; //statusText sendiri berasal dari deklarasian id di halaman html, dan dimasukan kedalam variabel const statusText, sementara textContent adalah element DOM untuk mendapatkan teks murni tanpa tag HTML
    running = true; //running true memastikan bahwa game sedang berjalan
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running){
        return;
    } //untuk menjalankan suatu fungsi ketika user mengklik coloumn ber id cellIndex dan menyeleksi apakah id cellIndex tidak ada yang kosong atau running, kalo ngga dia bakal berhenti
    updateCell(this, cellIndex);
    checkWinner(); //untuk mengecek pemain dan mengupdate keterangan pemain pada cell
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
} //untuk menyimpan simbol pemain saat ini pada coloumn index atau kotak papan permainan

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
} //fungsi ini digunakan untuk mengganti pemain, cara bacanya = currentPlayer apakah X? kalo iya maka slanjutnya akan diganti O begitupun seterusnya
function checkWinner(){
    let roundWon =  false; //kalalu ngga ada yang menang
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        // fungsi ini digunakan untuk mengecek cell baris

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        } //kalau cell a b dan c ada yang kosong alias ngga ada pemenang maka dia akan tetap melanjutkan
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        } // tapi kalo cell a b dan c sudah terisi maka roundWon akan berubah jadi true artinya pemenang di tentukan dan akan berhenti gamenya
    }

    if(roundWon) {
        statusText.textContent = `${currentPlayer}'s wins!`
        running = false; //mencetak siapa yang menang

        if(currentPlayer === "X") {
            scoreX++ ; 
            document.getElementById("scoreX").textContent = scoreX;
        } else {
            scoreO++;
            document.getElementById("scoreO").textContent = scoreO;
        } //fungsi ini digunakan untuk menghitung seberapa banyak score menang dari currentplayers
        
    } 
    else if(!options.includes("")) {
        statusText.textContent = 'Draw';
        running = false; //fungsi ini digunakan ketika tidak ada yang kosong alias coloumn sudah penuh semua maka akan mencetak seri dan menampilkan statusText

        history.push(`Game ${history.length + 1} : Draw`);
        updateHistory(); 
        //fungsi ini digunakan untuk menghitung berapa total seri Draw

    } else {
        changePlayer(); //atau akan berganti pemain
    }
}

function restartGame(){
    currentPlayer = "X"; //menentukan default pemain pertama
    options = ["", "", "", "", "", "", "", "", ""]; //memanggil variabel option pendeklarasian kolom kolom pada game
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = ""); //untuk menghapus tiap text yang ada pada cell tiap game di restart, atau function restartGame dijalankan
    running = true; //permainan dijalankan
}

function updateHistory() {
    const historyList = document.getElementById("history");
    historyList.innerHTML = "";

    history.forEach((match, index) => {
        const li = document.createElement("li");
        li.textContent = `Game ${index + 1}: ${match}`;
        historyList.appendChild(li);
    });
}
