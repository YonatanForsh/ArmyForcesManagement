//מערך חיילים לשמירה באחסון מקומי
const personnels = 
[
    {
        id: 1,
        fullName: "John Doe",
        rank: "Sergeant",
        position: "Rifleman",
        platoon: "Alpha",
        missionLength: "200",
        status: "Active"
    },
    {
        id: 2,
        fullName: "Dane Smith",
        rank: "Lieutenant",
        position: "Medic",
        platoon: "Bravo",
        missionLength: "300",
        status: "Reserve"
    },
    {
        id: 3,
        fullName: "Mike Johnson",
        rank: "Captain",
        position: "Commander",
        platoon: "Charlie",
        missionLength: "150",
        status: "Retired"
    }
]

//משתני דגל
let addCounter = 4
let isSort = false
const statuses = ["Active", "Reserve", "Retired"]
const rowsInTable = document.querySelector(".rowsInTable")
const addButton = document.querySelector(".addButton")
const fninp = document.querySelector(".fullName-inp")
const rnkinp = document.querySelector(".rank-inp")
const poinp = document.querySelector(".position-inp")
const plinp = document.querySelector(".platoon-inp")
const mtinp = document.querySelector(".missionTime-inp")
const slctinp = document.querySelector(".selectedStatus")
const selectedStatus = document.querySelector(".selectedStatus")

//טעינת רשימה החיילים מהמערך בכל טעינה של הדף
updateLocalStorage()
displayPerssonels()
statusesOptions()

//אירוע של הוספת חייל
addButton.addEventListener("click", addSoldier)



// - - - - - - פונקציות - - - - - - //

//פונקציית טעינת/יצירה של אחסון מקומי
function loadLocalStorage()
{
    const personnelsArr = localStorage.getItem("personnels") || "[]"
    return JSON.parse(personnelsArr)
}

//אתחול אחסון מקומי
function updateLocalStorage()
{
    localStorage.setItem("personnels", JSON.stringify(personnels))
}

//פונקציית שמירה באחסון מקומי
function saveInLocalStorage(arg)
{
    localStorage.setItem("personnels", JSON.stringify(arg))
}

//פונקציית הצגת רשימת החיילים לעמוד הבית
function displayPerssonels()
{
    rowsInTable.innerHTML = ""
    const allSoldiers = loadLocalStorage()
    for (const s of allSoldiers)
    {
        // יצירה ואפיון של שורה
        const row = document.createElement("tr")
        row.classList.add("tr")

        //יצירה ואפיון של   
        const fntd = document.createElement("td")
        fntd.classList.add("td")
        fntd.textContent = s.fullName

        //יצירה ואפיון של   
        const rnktd = document.createElement("td")
        rnktd.classList.add("td")
        rnktd.textContent = s.rank

        //יצירה ואפיון של   
        const potd = document.createElement("td")
        potd.classList.add("td")
        potd.textContent = s.position

        //יצירה ואפיון של   
        const pltd = document.createElement("td")
        pltd.classList.add("td")
        pltd.textContent = s.platoon

        //יצירה ואפיון של   
        const sttd = document.createElement("td")
        sttd.classList.add("td")
        sttd.textContent = s.status

        //יצירה ואפיון של   
        const actd = document.createElement("td")
        actd.classList.add("td")
        actd.classList.add("actd")

        //יצירה ואפיון של כפתור מחיק
        const del = document.createElement("button")
        del.classList.add("btn")
        del.textContent = "remove"
        del.addEventListener("click", () => { removeSoldier(s.id) })

        //יצירת כפתור משך זמן משימה
        const mission = document.createElement("button")
        mission.classList.add("btn")
        mission.textContent = "mission"
        mission.addEventListener("click", () => { swowMissionTime(s.missionLength) })

        //יצירת כפתור עריכת פרטי חייל
        const edit = document.createElement("button")
        edit.classList.add("btn")
        edit.textContent = "edit"
        edit.addEventListener("click", () => { goToEdit(s.id) })

        actd.appendChild(del)
        actd.appendChild(mission)
        actd.appendChild(edit)

        row.appendChild(fntd)
        row.appendChild(rnktd)
        row.appendChild(potd)
        row.appendChild(pltd)
        row.appendChild(sttd)
        row.appendChild(actd)
        
        rowsInTable.appendChild(row)
    }
}

//פונקציית הוספת חייל לאחסון המקומי
function addSoldier()
{
    const newSoldier = { id: addCounter, fullName: fninp.value, rank: rnkinp.value, position: poinp.value, platoon: plinp.value, missionLength: mtinp.value, status: slctinp.value}
    const allSoldiers = loadLocalStorage()
    allSoldiers.push(newSoldier)
    saveInLocalStorage(allSoldiers)
    displayPerssonels()
    addCounter ++
}

//פונקציית מחיקת חייל על פי מזהה
function removeSoldier(id)
{
    const allSoldiers = loadLocalStorage()
    const newList = allSoldiers.filter(s => s.id != id)
    saveInLocalStorage(newList)
    displayPerssonels()
}

//פונקציית עריכת פרטי חייל
function UpdateSoldier(soldier)
{
    const allSoldiers = loadLocalStorage()
    const currSoldier = allSoldiers.find(s => s.id == id)
    currSoldier.fullName = soldier.fullName
    currSoldier.rank = soldier.rank
    currSoldier.position = soldier.position
    currSoldier.platoon = soldier.platoon
    currSoldier.missionLength = soldier.missionLength
    currSoldier.status = soldier.status
    goToHome()
}

//פונקציית מעבר לעריכת פרטים
function goToEdit(id)
{

}

//פונקציית מעבר לעמוד הבית 
function goToHome()
{

}

//פונקציית מיון רשימת החיילים לפי א ב
function sortSoldiersList()
{    
    const allSoldiers = loadLocalStorage()
    allSoldiers.sort((a, b) => a.fullName.localeCompare(b.fullName));
    console.log(allSoldiers);    
    if (isSort == true)
    {
        allSoldiers.reverse()
        isSort = false
    }
    else{ isSort = true }
    saveInLocalStorage(allSoldiers)
    displayPerssonels()
    console.log(isSort)
}

//פונקציית הצגה של זמן של המשימה או סטטוס הושלמה
function swowMissionTime()
{

}

//פונקציית אתחול סטטוס חייל בטופס הוספת חייל
function statusesOptions()
{
    for (const s of statuses)
    {
        const option = document.createElement("option")
        option.classList.add("option")
        option.value = s
        option.textContent = s
        selectedStatus.appendChild(option)
    }
}
