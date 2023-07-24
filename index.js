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
            <div class="system-block">
            <h2 class="system-title">${system.model}</h2>
            <h3 class="system-OS">${system.OS}</h3>
            <ul class="system-specs">
            `)
        system.specs.forEach((spec) => {
            systemsHTML = systemsHTML.concat(`<li id="system-spec">${spec}</li>`)
        })
        systemsHTML = systemsHTML.concat(`</ul><span class="system-price">\$${system.price}</span></div>`)
    });

    return systemsHTML;
}
