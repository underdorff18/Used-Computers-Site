window.onload = function() {
    document.getElementById("systems-container").innerHTML = "Loading";
    getSystemsFile().then((systems) => {
        document.getElementById("systems-container").innerHTML = formatSystems(systems);
    })
}

async function getSystemsFile() {
    const response = await fetch("http://localhost:3000/systems");
    const systems = await response.json();
    return systems;
}

function formatSystems(systems) {
    let systemsHTML = ""
    systems.forEach((system) => {
        systemsHTML = systemsHTML.concat(`
            <div id="system">
            <h1>${system.model}</h1>\n
            <div id="system-details">
            <p>${system.price} ${system.OS}</p>
            <ul id="system-specs">
            `)
        system.specs.forEach((spec) => {
            systemsHTML = systemsHTML.concat(`<li id="system-spec">${spec}</li>`)
        })
        systemsHTML = systemsHTML.concat('</ul></div></div>')
    });

    return systemsHTML;
}
