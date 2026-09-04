/* =========================================================
   GeoGuard NER - CLEAN FINAL SCRIPT
   ========================================================= */

(() => {
    "use strict";

    let selectedRole = "";
    let publicLocation = null;

    const ROLE_CONFIG = {

        government: {
            title: "Government Login",
            label: "GOVERNMENT ACCESS",
            description:
                "Access complete regional landslide intelligence.",
            icon: "fa-building-columns",
            username: "govt123",
            password: "govt@123",
            dashboard: "governmentDashboard"
        },

        station: {
            title: "Station Head Login",
            label: "STATION ACCESS",
            description:
                "Monitor your station and all subordinate zones.",
            icon: "fa-tower-broadcast",
            username: "station123",
            password: "station@123",
            dashboard: "stationDashboard"
        },

        zonal: {
            title: "Zonal Head Login",
            label: "ZONAL ACCESS",
            description:
                "Access intelligence for your assigned zone.",
            icon: "fa-location-dot",
            username: "zonal123",
            password: "zonal@123",
            dashboard: "zonalDashboard"
        }

    };


    const RISK_DATA = {

        "Dima Hasao": {
            state: "Assam",
            risk: 68,
            level: "HIGH",
            rainfall: "84 mm",
            soil: "71%",
            slope: "38°",
            temperature: "24°C",
            message:
                "Elevated landslide probability detected. Increased monitoring is recommended."
        },

        "Karbi Anglong": {
            state: "Assam",
            risk: 54,
            level: "MODERATE",
            rainfall: "67 mm",
            soil: "63%",
            slope: "33°",
            temperature: "25°C",
            message:
                "Moderate landslide probability detected. Continue regular monitoring."
        },

        "East Khasi Hills": {
            state: "Meghalaya",
            risk: 72,
            level: "HIGH",
            rainfall: "96 mm",
            soil: "78%",
            slope: "42°",
            temperature: "21°C",
            message:
                "High landslide probability detected. Enhanced monitoring is recommended."
        },

        "Aizawl": {
            state: "Mizoram",
            risk: 46,
            level: "MODERATE",
            rainfall: "52 mm",
            soil: "49%",
            slope: "29°",
            temperature: "23°C",
            message:
                "Moderate landslide probability detected. Conditions should be monitored."
        },

        "Itanagar": {
            state: "Arunachal Pradesh",
            risk: 61,
            level: "HIGH",
            rainfall: "102 mm",
            soil: "69%",
            slope: "36°",
            temperature: "23°C",
            message:
                "Moderate-to-high risk conditions detected."
        },

        "Kohima": {
            state: "Nagaland",
            risk: 57,
            level: "MODERATE",
            rainfall: "77 mm",
            soil: "63%",
            slope: "34°",
            temperature: "23°C",
            message:
                "Continuous monitoring is recommended."
        },

        "Imphal Hills": {
            state: "Manipur",
            risk: 49,
            level: "MODERATE",
            rainfall: "69 mm",
            soil: "61%",
            slope: "29°",
            temperature: "24°C",
            message:
                "Monitoring conditions remain moderate."
        },

        "Gangtok": {
            state: "Sikkim",
            risk: 66,
            level: "HIGH",
            rainfall: "91 mm",
            soil: "73%",
            slope: "40°",
            temperature: "19°C",
            message:
                "Steep terrain and rainfall require close monitoring."
        }

    };


    const $ = id =>
        document.getElementById(id);


    /* =========================================================
       BODY LOCK
       ========================================================= */

    function setBodyLocked(locked) {

        document.body.style.overflow =
            locked ? "hidden" : "";

    }


    /* =========================================================
       ACCESS PORTAL
       ========================================================= */

    function showPortal() {

        const portal =
            $("accessPortal");

        if (portal) {

            portal.classList.remove(
                "portal-hidden"
            );

        }

        setBodyLocked(true);

    }


    function hidePortal() {

        const portal =
            $("accessPortal");

        if (portal) {

            portal.classList.add(
                "portal-hidden"
            );

        }

    }


    window.openLogin = function () {

        closeRoleLogin();
        closePublicAccess();

        hideAllDashboards();

        showPortal();

    };


    window.closeLogin = function () {

        hidePortal();

        setBodyLocked(false);

    };


    /* =========================================================
       ROLE LOGIN
       ========================================================= */

    window.openRoleLogin = function (role) {

        const config =
            ROLE_CONFIG[role];

        if (!config) return;

        selectedRole =
            role;


        const title =
            $("roleLoginTitle");

        const label =
            $("roleLoginLabel");

        const description =
            $("roleLoginDescription");

        const icon =
            $("roleLoginIcon");

        const username =
            $("portalUsername");

        const password =
            $("portalPassword");

        const error =
            $("portalLoginError");

        const modal =
            $("roleLoginModal");


        if (title) {

            title.textContent =
                config.title;

        }


        if (label) {

            label.textContent =
                config.label;

        }


        if (description) {

            description.textContent =
                config.description;

        }


        if (icon) {

            icon.className =
                "fa-solid " +
                config.icon;

        }


        if (username) {

            username.value = "";

        }


        if (password) {

            password.value = "";

        }


        if (error) {

            error.textContent = "";

        }


        if (modal) {

            modal.classList.add(
                "active"
            );

        }


        setBodyLocked(true);


        setTimeout(
            () => username?.focus(),
            80
        );

    };


    window.closeRoleLogin = function () {

        const modal =
            $("roleLoginModal");

        if (modal) {

            modal.classList.remove(
                "active"
            );

        }

        selectedRole = "";

    };


    /* =========================================================
       LOGIN SUBMIT
       ========================================================= */

    window.handlePortalLogin =
        function (event) {

            if (event) {

                event.preventDefault();

            }


            const config =
                ROLE_CONFIG[
                    selectedRole
                ];


            const username =
                $("portalUsername")
                    ?.value
                    .trim() || "";


            const password =
                $("portalPassword")
                    ?.value
                    .trim() || "";


            const error =
                $("portalLoginError");


            if (!config) {

                if (error) {

                    error.textContent =
                        "Please select an access role.";

                }

                return false;

            }


            if (
                username !==
                    config.username ||

                password !==
                    config.password
            ) {

                if (error) {

                    error.textContent =
                        "Invalid username or password.";

                }

                return false;

            }


            const dashboard =
                $(config.dashboard);


            if (!dashboard) {

                if (error) {

                    error.textContent =
                        "This dashboard is not connected yet.";

                }

                return false;

            }


            sessionStorage.setItem(
                "geoGuardRole",
                selectedRole
            );


            $("roleLoginModal")
                ?.classList
                .remove("active");


            hidePortal();


            hideAllDashboards();


            dashboard.style.display =
                "block";


            setBodyLocked(true);


            createNavigator(
                dashboard
            );


            return false;

        };


    /* =========================================================
       HIDE DASHBOARDS
       ========================================================= */

    function hideAllDashboards() {

        [
            "governmentDashboard",
            "stationDashboard",
            "zonalDashboard",
            "publicDashboard"
        ].forEach(function (id) {

            const element = $(id);

            if (element) {

                element.style.display =
                    "none";

            }

        });

    }


    /* =========================================================
       EXIT DASHBOARD
       ========================================================= */

    function exitDashboard(id) {

        const dashboard =
            $(id);

        if (dashboard) {

            dashboard.style.display =
                "none";

        }


        sessionStorage.removeItem(
            "geoGuardRole"
        );


        sessionStorage.removeItem(
            "publicUser"
        );


        showPortal();

    }


    window.closeGovernmentDashboard =
        function () {

            exitDashboard(
                "governmentDashboard"
            );

        };


    window.closeStationDashboard =
        function () {

            exitDashboard(
                "stationDashboard"
            );

        };


    window.closeZonalDashboard =
        function () {

            exitDashboard(
                "zonalDashboard"
            );

        };


    /* =========================================================
       PUBLIC ACCESS
       ========================================================= */

    window.openPublicAccess =
        function () {

            const modal =
                $("publicAccessModal");

            const gmail =
                $("publicGmail");

            const error =
                $("publicLoginError");

            const status =
                $("locationStatus");

            const button =
                $("locationButton");


            if (gmail) {

                gmail.value = "";

            }


            if (error) {

                error.textContent = "";

            }


            if (status) {

                status.textContent =
                    "Location access is required";

            }


            if (button) {

                button.textContent =
                    "Allow";

                button.disabled =
                    false;

            }


            publicLocation =
                null;


            restoreSavedLocation();


            if (modal) {

                modal.classList.add(
                    "active"
                );

            }


            setBodyLocked(true);

        };


    window.closePublicAccess =
        function () {

            const modal =
                $("publicAccessModal");

            if (modal) {

                modal.classList.remove(
                    "active"
                );

            }

            setBodyLocked(true);

        };


    /* =========================================================
       PUBLIC LOCATION - ROBUST PERMISSION HANDLING
       ========================================================= */

    function setLocationUI(message, buttonText, disabled, approved) {

        const status = $("locationStatus");
        const button = $("locationButton");
        const container =
            document.querySelector(".location-permission");

        if (status) {
            status.textContent = message;
        }

        if (button) {
            button.textContent = buttonText;
            button.disabled = !!disabled;
        }

        if (container) {
            container.classList.toggle(
                "location-approved",
                !!approved
            );
        }
    }


    function saveCurrentLocation(position) {

        publicLocation = {
            latitude: Number(
                position.coords.latitude
            ),
            longitude: Number(
                position.coords.longitude
            ),
            accuracy: Number(
                position.coords.accuracy || 0
            )
        };

        sessionStorage.setItem(
            "geoGuardLocation",
            JSON.stringify(publicLocation)
        );

        setLocationUI(
            "Location access granted ✓",
            "Location Granted ✓",
            false,
            true
        );
    }


    function restoreSavedLocation() {

        try {

            const saved =
                JSON.parse(
                    sessionStorage.getItem(
                        "geoGuardLocation"
                    )
                );

            if (
                saved &&
                Number.isFinite(saved.latitude) &&
                Number.isFinite(saved.longitude)
            ) {

                publicLocation = saved;

                setLocationUI(
                    "Location access granted ✓",
                    "Location Granted ✓",
                    false,
                    true
                );

                return true;
            }

        } catch (error) {
            publicLocation = null;
        }

        return false;
    }


    function getLocationErrorMessage(error) {

        if (!error) {
            return "Unable to get your location.";
        }

        if (error.code === 1) {
            return "Location permission was blocked. Please allow location for this site and press Allow again.";
        }

        if (error.code === 2) {
            return "Location is currently unavailable. Please check GPS/Wi-Fi and try again.";
        }

        if (error.code === 3) {
            return "Location request timed out. Please press Allow again.";
        }

        return "Unable to get your location. Please try again.";
    }


    window.requestPublicLocation =
        function () {

            if (
                !window.isSecureContext &&
                location.hostname !== "localhost" &&
                location.hostname !== "127.0.0.1" &&
                location.hostname !== "::1"
            ) {

                setLocationUI(
                    "Location needs HTTPS or localhost.",
                    "Use HTTPS / localhost",
                    false,
                    false
                );

                return;
            }


            if (!navigator.geolocation) {

                setLocationUI(
                    "Geolocation is not supported by this browser.",
                    "Location Unavailable",
                    false,
                    false
                );

                return;
            }


            setLocationUI(
                "Requesting location permission...",
                "Checking...",
                true,
                false
            );


            const success =
                function (position) {

                    saveCurrentLocation(
                        position
                    );

                };


            const failure =
                function (error) {

                    publicLocation = null;

                    sessionStorage.removeItem(
                        "geoGuardLocation"
                    );

                    setLocationUI(
                        getLocationErrorMessage(
                            error
                        ),
                        error?.code === 1
                            ? "Allow Location"
                            : "Try Again",
                        false,
                        false
                    );

                };


            navigator.geolocation.getCurrentPosition(
                success,
                failure,
                {
                    enableHighAccuracy: false,
                    timeout: 20000,
                    maximumAge: 300000
                }
            );

        };


    /* Try restoring previously granted permission immediately. */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            restoreSavedLocation();

        }
    );


    /* =========================================================
       PUBLIC CONTINUE
       ========================================================= */

    window.continuePublicAccess =
        function () {

            const gmail =
                $("publicGmail")
                    ?.value
                    .trim() || "";


            const error =
                $("publicLoginError");


            if (!gmail) {

                if (error) {

                    error.textContent =
                        "Please enter your Gmail ID.";

                }

                return;

            }


            if (
                !gmail
                    .toLowerCase()
                    .endsWith("@gmail.com")
            ) {

                if (error) {

                    error.textContent =
                        "Please enter a valid Gmail ID.";

                }

                return;

            }


            if (!publicLocation) {

                if (error) {

                    error.textContent =
                        "Please allow current location access.";

                }

                return;

            }


            const publicDashboard =
                $("publicDashboard");


            if (!publicDashboard) {

                if (error) {

                    error.textContent =
                        "Public dashboard is not connected.";

                }

                return;

            }


            const area =
                resolveDemoArea(
                    publicLocation.latitude,
                    publicLocation.longitude
                );


            sessionStorage.setItem(

                "publicUser",

                JSON.stringify({

                    email:
                        gmail,

                    latitude:
                        publicLocation
                            .latitude,

                    longitude:
                        publicLocation
                            .longitude,

                    area:
                        area

                })

            );


            sessionStorage.setItem(
                "geoGuardRole",
                "public"
            );


            $("publicAccessModal")
                ?.classList
                .remove("active");


            hidePortal();


            hideAllDashboards();


            publicDashboard.style.display =
                "block";


            setBodyLocked(true);


            updatePublicArea();


            createNavigator(
                publicDashboard
            );

        };


    /* =========================================================
       PUBLIC LOGOUT
       ========================================================= */

    window.logoutPublicUser =
        function () {

            exitDashboard(
                "publicDashboard"
            );

        };
        /* =========================================================
   GEOGUARD NER - CLEAN FINAL SCRIPT
   BLOCK 2 / 4
   RISK DASHBOARD + SEARCH + FILTERS
   ========================================================= */


/* =========================================================
   RISK DASHBOARD UPDATE
   ========================================================= */

function updateRiskDashboard(
    locationName,
    location
) {

    if (!location) return;


    const selectedArea =
        $("selectedArea");

    const riskPercentage =
        $("riskPercentage");

    const riskStatus =
        $("riskStatus");

    const riskProgressBar =
        $("riskProgressBar");

    const riskMessage =
        $("riskMessage");

    const rainfall =
        $("rainfallValue");

    const soil =
        $("soilValue");

    const slope =
        $("slopeValue");

    const temperature =
        $("temperatureValue");


    if (selectedArea) {

        selectedArea.textContent =
            locationName +
            ", " +
            location.state;

    }


    if (riskPercentage) {

        animateRiskNumber(
            riskPercentage,
            location.risk
        );

    }


    if (riskStatus) {

        riskStatus.textContent =
            location.level;

        riskStatus.className =
            "risk-badge " +
            location.level.toLowerCase();

    }


    if (riskProgressBar) {

        riskProgressBar.style.width =
            location.risk + "%";

    }


    if (riskMessage) {

        riskMessage.textContent =
            location.message;

    }


    if (rainfall) {

        rainfall.textContent =
            location.rainfall;

    }


    if (soil) {

        soil.textContent =
            location.soil;

    }


    if (slope) {

        slope.textContent =
            location.slope;

    }


    if (temperature) {

        temperature.textContent =
            location.temperature;

    }

}


/* =========================================================
   RISK NUMBER ANIMATION
   ========================================================= */

function animateRiskNumber(
    element,
    target
) {

    if (!element) return;


    const startValue =
        parseInt(
            element.textContent
        ) || 0;


    const duration =
        700;

    const startTime =
        performance.now();


    function update(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.round(
                startValue +
                (
                    target -
                    startValue
                ) *
                eased
            );


        element.textContent =
            value;


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        }

    }


    requestAnimationFrame(
        update
    );

}


/* =========================================================
   GRAPHICAL ZONE SELECTION
   ========================================================= */

window.selectGraphZone =
    function (
        name,
        risk,
        level
    ) {

        const location =
            RISK_DATA[name];

        if (!location) return;


        updateRiskDashboard(
            name,
            location
        );


        document
            .querySelectorAll(
                ".graph-zone"
            )
            .forEach(
                function (card) {

                    card.classList.remove(
                        "selected-location"
                    );

                }
            );


        document
            .querySelectorAll(
                ".graph-zone"
            )
            .forEach(
                function (card) {

                    const heading =
                        card.querySelector(
                            "h4"
                        );


                    if (
                        heading &&
                        heading.textContent
                            .trim()
                            .toLowerCase() ===
                        name
                            .toLowerCase()
                    ) {

                        card.classList.add(
                            "selected-location"
                        );

                    }

                }
            );


        const dashboard =
            document.querySelector(
                ".live-dashboard"
            );


        if (dashboard) {

            dashboard.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "center"

            });

        }

    };


/* =========================================================
   LOCATION SEARCH
   ========================================================= */

window.searchRiskLocation =
    function () {

        const input =
            $("locationSearch") ||
            $("riskSearchInput") ||
            $("navLocationSearch");


        if (!input) return;


        const query =
            input.value
                .trim()
                .toLowerCase();


        if (!query) {

            alert(
                "Please enter a state or vulnerable area."
            );

            return;

        }


        const found =
            Object.keys(
                RISK_DATA
            ).find(
                function (name) {

                    const data =
                        RISK_DATA[name];


                    return (

                        name
                            .toLowerCase()
                            .includes(query)

                        ||

                        data.state
                            .toLowerCase()
                            .includes(query)

                    );

                }
            );


        if (!found) {

            alert(
                "Location not found. Try Dima Hasao, Karbi Anglong, East Khasi Hills, Aizawl, Itanagar, Kohima or Gangtok."
            );

            return;

        }


        updateRiskDashboard(
            found,
            RISK_DATA[found]
        );


        const dashboard =
            document.querySelector(
                ".live-dashboard"
            );


        if (dashboard) {

            dashboard.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "start"

            });

        }

    };


/* =========================================================
   SELECT LOCATION
   ========================================================= */

window.selectLocation =
    function (locationName) {

        const location =
            RISK_DATA[
                locationName
            ];


        if (!location) return;


        const input =
            $("locationSearch");


        if (input) {

            input.value =
                locationName;

        }


        updateRiskDashboard(
            locationName,
            location
        );

    };


/* =========================================================
   RISK FILTERING
   ========================================================= */

window.filterRiskDashboard =
    function () {

        const searchInput =
            $("riskSearchInput");

        const stateFilter =
            $("stateFilter");

        const riskFilter =
            $("riskFilter");


        const search =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        const selectedState =
            stateFilter
                ? stateFilter.value
                : "";


        const selectedRisk =
            riskFilter
                ? riskFilter.value
                : "";


        const cards =
            document.querySelectorAll(
                ".graph-zone"
            );


        cards.forEach(
            function (card) {

                const title =
                    card.querySelector(
                        "h4"
                    );

                const state =
                    card.querySelector(
                        "small"
                    );


                if (!title) return;


                const name =
                    title.textContent
                        .trim();


                const stateName =
                    state
                        ? state.textContent
                            .trim()
                        : "";


                const location =
                    RISK_DATA[name];


                if (!location) {

                    card.style.display =
                        "none";

                    return;

                }


                const searchMatch =

                    !search ||

                    name
                        .toLowerCase()
                        .includes(search)

                    ||

                    stateName
                        .toLowerCase()
                        .includes(search);


                const stateMatch =

                    !selectedState ||

                    location.state ===
                    selectedState;


                const riskMatch =

                    !selectedRisk ||

                    location.level ===
                    selectedRisk;


                if (
                    searchMatch &&
                    stateMatch &&
                    riskMatch
                ) {

                    card.style.display =
                        "";

                    card.classList.add(
                        "filter-match"
                    );

                } else {

                    card.style.display =
                        "none";

                    card.classList.remove(
                        "filter-match"
                    );

                }

            }
        );

    };


/* =========================================================
   FILTER LISTENERS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const stateFilter =
            $("stateFilter");

        const riskFilter =
            $("riskFilter");

        const searchInput =
            $("riskSearchInput");


        if (stateFilter) {

            stateFilter.addEventListener(
                "change",
                function () {

                    filterRiskDashboard();

                }
            );

        }


        if (riskFilter) {

            riskFilter.addEventListener(
                "change",
                function () {

                    filterRiskDashboard();

                }
            );

        }


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                function () {

                    filterRiskDashboard();

                }
            );


            searchInput.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        filterRiskDashboard();

                    }

                }
            );

        }

    }
);


/* =========================================================
   NAV LOCATION SEARCH
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const navSearch =
            $("navLocationSearch");


        if (!navSearch) return;


        navSearch.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    const value =
                        navSearch.value
                            .trim();


                    if (!value) return;


                    const found =
                        Object.keys(
                            RISK_DATA
                        ).find(
                            function (name) {

                                const data =
                                    RISK_DATA[
                                        name
                                    ];


                                return (

                                    name
                                        .toLowerCase()
                                        .includes(
                                            value
                                                .toLowerCase()
                                        )

                                    ||

                                    data.state
                                        .toLowerCase()
                                        .includes(
                                            value
                                                .toLowerCase()
                                        )

                                );

                            }
                        );


                    if (found) {

                        updateRiskDashboard(
                            found,
                            RISK_DATA[found]
                        );


                        document
                            .querySelector(
                                ".live-dashboard"
                            )
                            ?.scrollIntoView({

                                behavior:
                                    "smooth",

                                block:
                                    "start"

                            });

                    } else {

                        alert(
                            "Location not found."
                        );

                    }

                }

            }
        );

    }
);


/* =========================================================
   MAP CARD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const mapCard =
            document.querySelector(
                ".map-card"
            );


        if (!mapCard) return;


        mapCard.addEventListener(
            "click",
            function () {

                const monitoring =
                    $("monitoring");


                if (monitoring) {

                    monitoring.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }

            }
        );

    }
);


/* =========================================================
   RISK DASHBOARD INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const firstLocation =
            RISK_DATA[
                "Dima Hasao"
            ];


        if (firstLocation) {

            updateRiskDashboard(
                "Dima Hasao",
                firstLocation
            );

        }

    }
);


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const elements =
            document.querySelectorAll(
                ".info-card, " +
                ".process-card, " +
                ".live-dashboard, " +
                ".graph-zone"
            );


        elements.forEach(
            function (element) {

                element.classList.add(
                    "reveal"
                );

            }
        );


        if (
            !("IntersectionObserver"
                in window)
        ) {

            elements.forEach(
                function (element) {

                    element.classList.add(
                        "visible"
                    );

                }
            );

            return;

        }


        const observer =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "visible"
                                    );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold:
                        0.12
                }

            );


        elements.forEach(
            function (element) {

                observer.observe(
                    element
                );

            }
        );

    }
);


/* =========================================================
   PUBLIC AREA
   ========================================================= */

function updatePublicArea() {

    const dashboard =
        $("publicDashboard");


    if (!dashboard) return;


    let user = null;


    try {

        user =
            JSON.parse(
                sessionStorage.getItem(
                    "publicUser"
                )
            );

    } catch (error) {

        user = null;

    }


    if (!user) return;


    const area =
        user.area ||
        "Current Location";


    dashboard
        .querySelectorAll(
            "[data-public-area]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    area;

            }
        );


    dashboard
        .querySelectorAll(
            "[data-public-email]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    user.email || "";

            }
        );

}


/* =========================================================
   INITIALIZE PUBLIC AREA
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updatePublicArea();

    }
);
/* =========================================================
   GEOGUARD NER - CLEAN FINAL SCRIPT
   BLOCK 3 / 4
   FULL HEIGHT SIDEBAR + THEMES + DASHBOARD NAVIGATION
   ========================================================= */


/* =========================================================
   DASHBOARD NAVIGATION CONFIG
   ========================================================= */

const NAV_CONFIG = {

    governmentDashboard: [
        ["Overview", ".gov-welcome"],
        ["Regional Statistics", ".gov-stats"],
        ["Risk Map", ".gov-main-grid"],
        ["Priority Locations", ".gov-table-panel, .gov-areas-panel, .gov-regional-panel"],
        ["Live Alerts", ".gov-alerts"]
    ],

    stationDashboard: [
        ["Command Overview", ".dashboard-topbar, .dashboard-hero, .station-hero"],
        ["Statistics", ".dashboard-stats, .station-stats, .stats-grid"],
        ["Zones", ".zones-grid, .zones-section, .zone-grid, .gov-areas-grid"],
        ["Alerts", ".alert-panel, .alerts-panel, .alerts-section"]
    ],

    zonalDashboard: [
        ["Zone Overview", ".dashboard-topbar, .dashboard-hero, .zonal-hero"],
        ["Risk Status", ".risk-card, .risk-panel, .risk-section"],
        ["Environment", ".environment-grid, .environment-panel, .environment-section"],
        ["Alerts", ".alert-panel, .alerts-panel, .alerts-section"]
    ],

    publicDashboard: [
        ["Your Area", ".public-topbar, .public-area-card"],
        ["Risk & Weather", ".public-stats"],
        ["Safety Status", ".public-alert"]
    ]

};


/* =========================================================
   GET ACTIVE DASHBOARD
   ========================================================= */

function getActiveDashboard() {

    const ids = [
        "governmentDashboard",
        "stationDashboard",
        "zonalDashboard",
        "publicDashboard"
    ];

    for (const id of ids) {

        const dashboard = $(id);

        if (
            dashboard &&
            getComputedStyle(dashboard).display !== "none"
        ) {

            return dashboard;

        }

    }

    return null;

}


/* =========================================================
   ROLE NAME
   ========================================================= */

function getDashboardRole(id) {

    if (id === "governmentDashboard") {
        return "GOVERNMENT";
    }

    if (id === "stationDashboard") {
        return "STATION HEAD";
    }

    if (id === "zonalDashboard") {
        return "ZONAL HEAD";
    }

    return "PUBLIC";

}


/* =========================================================
   CREATE SIDEBAR
   ========================================================= */

function createNavigator(dashboard) {

    if (!dashboard) return;


    const existing =
        dashboard.querySelector(
            ".geo-sidebar"
        );

    if (existing) {
        return;
    }


    dashboard.classList.add(
        "geo-dashboard-with-sidebar"
    );


    const sidebar =
        document.createElement("aside");


    sidebar.className =
        "geo-sidebar";


    sidebar.innerHTML = `

        <div class="geo-sidebar-brand">

            <div class="geo-brand-mark">
                ◈
            </div>

            <div>

                <strong>
                    GeoGuard
                </strong>

                <span>
                    NER
                </span>

            </div>

        </div>


        <div class="geo-system-status">

            <span class="geo-status-dot"></span>

            <span>
                SYSTEM ONLINE
            </span>

        </div>


        <div class="geo-role-box">

            <small>
                CURRENT ACCESS
            </small>

            <strong>
                ${getDashboardRole(
                    dashboard.id
                )}
            </strong>

        </div>


        <div class="geo-sidebar-heading">
            NAVIGATION
        </div>


        <nav class="geo-sidebar-nav">
        </nav>


        <div class="geo-sidebar-bottom">

            <div>
                LIVE MONITORING
            </div>

            <strong class="geo-clock">
                --:--
            </strong>

        </div>

    `;


    dashboard.prepend(sidebar);


    const nav =
        sidebar.querySelector(
            ".geo-sidebar-nav"
        );


    const config =
        NAV_CONFIG[
            dashboard.id
        ] || [];


    const targets = [];


    config.forEach(
        function (item, index) {

            const label =
                item[0];

            const selector =
                item[1];


            const target =
                dashboard.querySelector(
                    selector
                );


            if (!target) return;


            if (!target.id) {

                target.id =
                    `geo-target-${dashboard.id}-${index}`;

            }


            targets.push(target);


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "geo-side-link";


            button.dataset.target =
                target.id;


            button.innerHTML = `

                <span class="geo-side-active"></span>

                <span class="geo-side-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <span class="geo-side-text">
                    ${label}
                </span>

            `;


            button.addEventListener(
                "click",
                function () {

                    const destination =
                        document.getElementById(
                            this.dataset.target
                        );


                    if (!destination) return;


                    destination.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );


            nav.appendChild(
                button
            );

        }
    );


    const buttons =
        sidebar.querySelectorAll(
            ".geo-side-link"
        );


    function setActive(target) {

        buttons.forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

            }
        );


        if (!target) return;


        const active =
            sidebar.querySelector(
                `[data-target="${target.id}"]`
            );


        if (active) {

            active.classList.add(
                "active"
            );

        }

    }


    setActive(
        targets[0]
    );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                setActive(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    root: dashboard,
                    threshold: 0.22
                }

            );


        targets.forEach(
            function (target) {

                observer.observe(
                    target
                );

            }
        );

    }


    /* CLOCK */

    const clock =
        sidebar.querySelector(
            ".geo-clock"
        );


    function updateClock() {

        if (!clock) return;


        const now =
            new Date();


        clock.textContent =
            now.toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

    }


    updateClock();


    setInterval(
        updateClock,
        30000
    );

}


/* =========================================================
   SIDEBAR + DASHBOARD THEME CSS
   ========================================================= */

const dashboardThemeStyle =
    document.createElement("style");


dashboardThemeStyle.id =
    "geoDashboardThemeStyle";


dashboardThemeStyle.textContent = `

    /* =====================================================
       FULL HEIGHT DASHBOARD SIDEBAR
       ===================================================== */

    .geo-dashboard-with-sidebar {

        position: relative;

        min-height: 100vh;

        padding-left: 255px !important;

        overflow-y: auto !important;

        overflow-x: hidden !important;

    }


    .geo-sidebar {

        position: fixed;

        inset:
            0 auto 0 0;

        width: 255px;

        min-height: 100vh;

        padding: 24px 16px;

        display: flex;

        flex-direction: column;

        background:
            linear-gradient(
                180deg,
                #071a20 0%,
                #06151b 100%
            );

        border-right:
            1px solid
            rgba(66,223,192,.12);

        box-shadow:
            10px 0 40px
            rgba(0,0,0,.18);

        z-index: 9999;

    }


    .geo-sidebar-brand {

        display: flex;

        align-items: center;

        gap: 11px;

        padding:
            4px 5px 20px;

        border-bottom:
            1px solid
            rgba(255,255,255,.07);

    }


    .geo-brand-mark {

        width: 42px;
        height: 42px;

        display: grid;

        place-items: center;

        border-radius: 13px;

        background:
            rgba(66,223,192,.10);

        border:
            1px solid
            rgba(66,223,192,.20);

        color:
            #42dfc0;

        font-size:
            20px;

    }


    .geo-sidebar-brand strong {

        display: block;

        color:
            #f2fbf9;

        font-size:
            15px;

        letter-spacing:
            .2px;

    }


    .geo-sidebar-brand span {

        display: block;

        margin-top: 2px;

        color:
            #42dfc0;

        font-size:
            9px;

        font-weight: 800;

        letter-spacing:
            2.5px;

    }


    .geo-system-status {

        display: flex;

        align-items: center;

        gap: 8px;

        margin-top: 16px;

        padding:
            9px 11px;

        border-radius:
            11px;

        background:
            rgba(66,223,192,.06);

        border:
            1px solid
            rgba(66,223,192,.08);

        color:
            #42dfc0;

        font-size:
            8px;

        font-weight:
            800;

        letter-spacing:
            1.2px;

    }


    .geo-status-dot {

        width: 7px;
        height: 7px;

        flex: 0 0 7px;

        border-radius: 50%;

        background:
            #42dfc0;

        box-shadow:
            0 0 10px
            rgba(66,223,192,.8);

        animation:
            geoStatusPulse
            1.5s infinite;

    }


    .geo-role-box {

        margin-top: 13px;

        padding:
            12px;

        border-radius:
            12px;

        background:
            rgba(255,255,255,.035);

        border:
            1px solid
            rgba(255,255,255,.05);

    }


    .geo-role-box small {

        display: block;

        margin-bottom: 5px;

        color:
            #657c82;

        font-size:
            7px;

        font-weight:
            800;

        letter-spacing:
            1.5px;

    }


    .geo-role-box strong {

        color:
            #e8f6f3;

        font-size:
            10px;

        letter-spacing:
            1px;

    }


    .geo-sidebar-heading {

        margin:
            22px 5px 10px;

        color:
            #5b7379;

        font-size:
            7px;

        font-weight:
            800;

        letter-spacing:
            1.7px;

    }


    .geo-sidebar-nav {

        display:
            flex;

        flex-direction:
            column;

        gap:
            5px;

    }


    .geo-side-link {

        position:
            relative;

        width:
            100%;

        min-height:
            44px;

        padding:
            7px 10px;

        display:
            grid;

        grid-template-columns:
            4px 28px 1fr;

        align-items:
            center;

        gap:
            9px;

        border:
            none;

        border-radius:
            10px;

        background:
            transparent;

        color:
            #82979b;

        text-align:
            left;

        font:
            inherit;

        cursor:
            pointer;

        transition:
            .22s ease;

    }


    .geo-side-link:hover {

        background:
            rgba(66,223,192,.055);

        color:
            #d9ece8;

        transform:
            translateX(3px);

    }


    .geo-side-link.active {

        background:
            linear-gradient(
                90deg,
                rgba(66,223,192,.12),
                rgba(66,223,192,.025)
            );

        color:
            #42dfc0;

    }


    .geo-side-active {

        width:
            3px;

        height:
            21px;

        border-radius:
            5px;

        background:
            transparent;

        transition:
            .2s ease;

    }


    .geo-side-link.active
    .geo-side-active {

        background:
            #42dfc0;

        box-shadow:
            0 0 10px
            rgba(66,223,192,.75);

    }


    .geo-side-number {

        width:
            28px;

        height:
            28px;

        display:
            grid;

        place-items:
            center;

        border-radius:
            8px;

        background:
            rgba(255,255,255,.045);

        color:
            #6d8489;

        font-size:
            8px;

        font-weight:
            800;

    }


    .geo-side-link.active
    .geo-side-number {

        background:
            rgba(66,223,192,.12);

        color:
            #42dfc0;

    }


    .geo-side-text {

        font-size:
            10px;

        font-weight:
            700;

    }


    .geo-sidebar-bottom {

        margin-top:
            auto;

        padding:
            14px 5px 2px;

        display:
            flex;

        justify-content:
            space-between;

        border-top:
            1px solid
            rgba(255,255,255,.07);

        color:
            #4f686e;

        font-size:
            7px;

        font-weight:
            800;

        letter-spacing:
            1px;

    }


    .geo-sidebar-bottom strong {

        color:
            #42dfc0;

        font-size:
            8px;

    }


    /* =====================================================
       GOVERNMENT THEME
       ===================================================== */

    #governmentDashboard {

        background:
            radial-gradient(
                circle at 75% 8%,
                rgba(38,111,135,.14),
                transparent 30%
            ),
            linear-gradient(
                145deg,
                #061217,
                #081b22 55%,
                #06151b
            ) !important;

        color:
            #eaf7f5;

    }


    #governmentDashboard
    .gov-content {

        position:
            relative;

        z-index:
            1;

    }


    #governmentDashboard
    .gov-panel,

    #governmentDashboard
    .gov-main-grid > div {

        background:
            linear-gradient(
                145deg,
                rgba(14,35,42,.96),
                rgba(8,24,30,.96)
            ) !important;

        border-color:
            rgba(94,184,190,.16) !important;

        color:
            #eaf7f5;

    }


    #governmentDashboard
    .gov-alert {

        background:
            linear-gradient(
                135deg,
                #10262d,
                #0b1d24
            ) !important;

        color:
            #e8f4f1 !important;

        border-color:
            rgba(255,255,255,.08) !important;

    }


    #governmentDashboard
    .gov-alert strong {

        color:
            #f2fbf9 !important;

    }


    #governmentDashboard
    .gov-alert span {

        color:
            #8fa6aa !important;

    }


    #governmentDashboard
    .gov-welcome h1,

    #governmentDashboard
    .gov-panel h3,

    #governmentDashboard
    .gov-panel strong {

        color:
            #eef9f6 !important;

    }


    #governmentDashboard
    .gov-welcome p,

    #governmentDashboard
    .gov-panel p {

        color:
            #8ba2a7 !important;

    }


    /* =====================================================
       STATION THEME
       ===================================================== */

    #stationDashboard {

        background:
            radial-gradient(
                circle at 85% 10%,
                rgba(42,108,180,.16),
                transparent 28%
            ),
            linear-gradient(
                145deg,
                #07131d,
                #0a1b29 55%,
                #08151f
            ) !important;

        color:
            #edf6fb;

    }


    #stationDashboard
    .dashboard-topbar {

        background:
            rgba(6,19,29,.92) !important;

        border-color:
            rgba(80,153,210,.18) !important;

    }


    #stationDashboard
    .dashboard-card,

    #stationDashboard
    .stat-card,

    #stationDashboard
    .zone-card,

    #stationDashboard
    .alert-card,

    #stationDashboard
    .panel,

    #stationDashboard
    .dashboard-panel {

        background:
            linear-gradient(
                145deg,
                rgba(14,35,49,.97),
                rgba(8,22,32,.97)
            ) !important;

        border-color:
            rgba(82,148,201,.16) !important;

        color:
            #eaf5fb;

    }


    #stationDashboard
    h1,

    #stationDashboard
    h2,

    #stationDashboard
    h3,

    #stationDashboard
    h4,

    #stationDashboard
    strong {

        color:
            #edf7fb !important;

    }


    #stationDashboard
    p,

    #stationDashboard
    small,

    #stationDashboard
    span {

        color:
            #8da5b0;

    }


    /* =====================================================
       ZONAL THEME
       ===================================================== */

    #zonalDashboard {

        background:
            radial-gradient(
                circle at 78% 12%,
                rgba(105,85,190,.17),
                transparent 28%
            ),
            linear-gradient(
                145deg,
                #0a0917,
                #12102a 55%,
                #0b1020
            ) !important;

        color:
            #f2efff;

    }


    #zonalDashboard
    .dashboard-topbar {

        background:
            rgba(11,9,25,.93) !important;

        border-color:
            rgba(139,122,224,.18) !important;

    }


    #zonalDashboard
    .dashboard-card,

    #zonalDashboard
    .stat-card,

    #zonalDashboard
    .zone-card,

    #zonalDashboard
    .panel,

    #zonalDashboard
    .dashboard-panel {

        background:
            linear-gradient(
                145deg,
                rgba(27,23,55,.97),
                rgba(15,14,36,.97)
            ) !important;

        border-color:
            rgba(145,126,224,.16) !important;

        color:
            #f0edff;

    }


    #zonalDashboard
    h1,

    #zonalDashboard
    h2,

    #zonalDashboard
    h3,

    #zonalDashboard
    h4,

    #zonalDashboard
    strong {

        color:
            #f3efff !important;

    }


    #zonalDashboard
    p,

    #zonalDashboard
    small,

    #zonalDashboard
    span {

        color:
            #aaa1bf;

    }


    /* =====================================================
       PUBLIC THEME
       ===================================================== */

    #publicDashboard {

        background:
            radial-gradient(
                circle at 12% 8%,
                rgba(53,207,173,.12),
                transparent 30%
            ),
            radial-gradient(
                circle at 85% 85%,
                rgba(47,104,224,.12),
                transparent 30%
            ),
            linear-gradient(
                145deg,
                #061317,
                #071b22 55%,
                #07131b
            ) !important;

        color:
            #eaf8f5;

    }


    #publicDashboard
    .public-area-card,

    #publicDashboard
    .public-stat,

    #publicDashboard
    .public-alert {

        background:
            linear-gradient(
                145deg,
                rgba(14,37,42,.96),
                rgba(8,24,31,.96)
            ) !important;

        border-color:
            rgba(66,223,192,.14) !important;

    }


    #publicDashboard
    h1,

    #publicDashboard
    h2,

    #publicDashboard
    h3,

    #publicDashboard
    strong {

        color:
            #effbf8 !important;

    }


    #publicDashboard
    p,

    #publicDashboard
    small {

        color:
            #8ca4a6 !important;

    }


    /* =====================================================
       SMOOTHER CONTENT OFFSET
       ===================================================== */

    #governmentDashboard .gov-topbar,
    #stationDashboard .dashboard-topbar,
    #zonalDashboard .dashboard-topbar {

        margin-left:
            0 !important;

    }


    /* =====================================================
       MOBILE
       ===================================================== */

    @media (max-width: 900px) {

        .geo-dashboard-with-sidebar {

            padding-left:
                0 !important;

            padding-bottom:
                86px !important;

        }


        .geo-sidebar {

            top:
                auto;

            bottom:
                10px;

            left:
                10px;

            right:
                10px;

            width:
                auto;

            min-height:
                auto;

            height:
                66px;

            padding:
                8px;

            border:
                1px solid
                rgba(66,223,192,.15);

            border-radius:
                17px;

        }


        .geo-sidebar-brand,
        .geo-system-status,
        .geo-role-box,
        .geo-sidebar-heading,
        .geo-sidebar-bottom {

            display:
                none;

        }


        .geo-sidebar-nav {

            flex-direction:
                row;

            overflow-x:
                auto;

            height:
                100%;

        }


        .geo-side-link {

            min-width:
                135px;

            height:
                50px;

        }

    }


    @keyframes geoStatusPulse {

        0% {
            box-shadow:
                0 0 0 0
                rgba(66,223,192,.45);
        }

        70% {
            box-shadow:
                0 0 0 7px
                rgba(66,223,192,0);
        }

        100% {
            box-shadow:
                0 0 0 0
                rgba(66,223,192,0);
        }

    }

`;


if (
    !document.getElementById(
        "geoDashboardThemeStyle"
    )
) {

    document.head.appendChild(
        dashboardThemeStyle
    );

}


/* =========================================================
   NAVIGATOR REFRESH
   ========================================================= */

function refreshNavigator() {

    const dashboard =
        getActiveDashboard();


    if (!dashboard) return;


    createNavigator(
        dashboard
    );

}


/* =========================================================
   SIMPLE NAVIGATOR INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setTimeout(
            refreshNavigator,
            500
        );

    }
);
/* =========================================================
   GEOGUARD NER - CLEAN FINAL SCRIPT
   BLOCK 4 / 4
   ZONAL DASHBOARD + MAP + FINAL POLISH
   ========================================================= */


/* =========================================================
   CREATE ZONAL DASHBOARD IF MISSING
   ========================================================= */

function ensureZonalDashboard() {

    let dashboard =
        $("zonalDashboard");


    if (dashboard) {
        return dashboard;
    }


    dashboard =
        document.createElement("section");


    dashboard.id =
        "zonalDashboard";


    dashboard.style.display =
        "none";


    dashboard.className =
        "role-dashboard geo-generated-dashboard";


    dashboard.innerHTML = `

        <div class="dashboard-topbar">

            <div class="dashboard-logo">

                <span class="logo-icon">
                    ◈
                </span>

                <div>

                    <strong>
                        GeoGuard NER
                    </strong>

                    <span>
                        ZONAL COMMAND CENTER
                    </span>

                </div>

            </div>


            <div class="dashboard-live">

                <span></span>

                LIVE ZONE MONITORING

            </div>


            <div class="dashboard-user">

                <strong>
                    Zonal Head
                </strong>

                <small>
                    ASSIGNED ZONE
                </small>

                <button
                    class="dashboard-exit"
                    onclick="closeZonalDashboard()">

                    <i class=
                        "fa-solid
                         fa-right-from-bracket">
                    </i>

                    Exit

                </button>

            </div>

        </div>


        <main class="zonal-content">

            <section class="zonal-hero">

                <div>

                    <span class="zonal-kicker">
                        ZONE INTELLIGENCE
                    </span>

                    <h1>
                        Assigned Zone
                        <span>Monitoring</span>
                    </h1>

                    <p>
                        View current landslide risk,
                        environmental conditions and
                        alerts for your assigned zone.
                    </p>

                </div>


                <div class="zonal-online">

                    <span></span>

                    SYSTEM ONLINE

                </div>

            </section>


            <section class="zonal-stats">

                <div class="zonal-stat">

                    <i class=
                        "fa-solid
                         fa-triangle-exclamation">
                    </i>

                    <span>RISK LEVEL</span>

                    <strong>
                        68%
                    </strong>

                    <small>
                        HIGH
                    </small>

                </div>


                <div class="zonal-stat">

                    <i class=
                        "fa-solid
                         fa-cloud-rain">
                    </i>

                    <span>RAINFALL</span>

                    <strong>
                        84 mm
                    </strong>

                    <small>
                        LAST 24 HOURS
                    </small>

                </div>


                <div class="zonal-stat">

                    <i class=
                        "fa-solid
                         fa-droplet">
                    </i>

                    <span>SOIL MOISTURE</span>

                    <strong>
                        71%
                    </strong>

                    <small>
                        MONITORED
                    </small>

                </div>


                <div class="zonal-stat">

                    <i class=
                        "fa-solid
                         fa-mountain">
                    </i>

                    <span>SLOPE</span>

                    <strong>
                        38°
                    </strong>

                    <small>
                        TERRAIN
                    </small>

                </div>

            </section>


            <section class="zonal-grid">


                <div class="zonal-panel risk-main-panel">

                    <div class="zonal-panel-head">

                        <div>

                            <span>
                                ASSIGNED ZONE
                            </span>

                            <h2>
                                Dima Hasao
                            </h2>

                            <small>
                                Assam
                            </small>

                        </div>


                        <div class="zonal-risk-badge">
                            HIGH RISK
                        </div>

                    </div>


                    <div class="zonal-risk-ring">

                        <div class="zonal-ring-inner">

                            <strong>
                                68%
                            </strong>

                            <span>
                                LANDSLIDE RISK
                            </span>

                        </div>

                    </div>


                    <div class="zonal-risk-bar">

                        <div style=
                            "width:68%">
                        </div>

                    </div>


                    <p class="zonal-message">

                        Elevated landslide probability
                        detected. Increased monitoring
                        is recommended.

                    </p>

                </div>


                <div class="zonal-panel environment-panel">

                    <div class="zonal-panel-head">

                        <div>

                            <span>
                                ENVIRONMENT
                            </span>

                            <h2>
                                Current Conditions
                            </h2>

                        </div>

                    </div>


                    <div class="environment-grid">

                        <div>

                            <i class=
                                "fa-solid
                                 fa-cloud-rain">
                            </i>

                            <span>
                                Rainfall
                            </span>

                            <strong>
                                84 mm
                            </strong>

                        </div>


                        <div>

                            <i class=
                                "fa-solid
                                 fa-droplet">
                            </i>

                            <span>
                                Soil Moisture
                            </span>

                            <strong>
                                71%
                            </strong>

                        </div>


                        <div>

                            <i class=
                                "fa-solid
                                 fa-mountain-sun">
                            </i>

                            <span>
                                Slope
                            </span>

                            <strong>
                                38°
                            </strong>

                        </div>


                        <div>

                            <i class=
                                "fa-solid
                                 fa-temperature-half">
                            </i>

                            <span>
                                Temperature
                            </span>

                            <strong>
                                24°C
                            </strong>

                        </div>

                    </div>

                </div>


            </section>


            <section class="zonal-panel zonal-alert-panel">

                <div class="zonal-panel-head">

                    <div>

                        <span>
                            EARLY WARNING
                        </span>

                        <h2>
                            Zone Alert Status
                        </h2>

                    </div>


                    <span class="zonal-alert-live">
                        ● LIVE
                    </span>

                </div>


                <div class="zonal-alert-content">

                    <div class="zonal-alert-icon">

                        <i class=
                            "fa-solid
                             fa-bell">
                        </i>

                    </div>


                    <div>

                        <strong>
                            Enhanced monitoring recommended
                        </strong>

                        <p>
                            Increased rainfall and
                            slope instability have been
                            detected in the assigned zone.
                        </p>

                    </div>

                </div>

            </section>


            <section class="zonal-panel">

                <div class="zonal-panel-head">

                    <div>

                        <span>
                            RECENT ACTIVITY
                        </span>

                        <h2>
                            Monitoring Timeline
                        </h2>

                    </div>

                </div>


                <div class="zonal-timeline">

                    <div>

                        <span class="timeline-dot"></span>

                        <div>

                            <strong>
                                Risk assessment updated
                            </strong>

                            <small>
                                2 minutes ago
                            </small>

                        </div>

                    </div>


                    <div>

                        <span class="timeline-dot"></span>

                        <div>

                            <strong>
                                Rainfall data received
                            </strong>

                            <small>
                                18 minutes ago
                            </small>

                        </div>

                    </div>


                    <div>

                        <span class="timeline-dot"></span>

                        <div>

                            <strong>
                                Satellite monitoring online
                            </strong>

                            <small>
                                32 minutes ago
                            </small>

                        </div>

                    </div>

                </div>

            </section>

        </main>

    `;


    document.body.appendChild(
        dashboard
    );


    addZonalTheme();

    return dashboard;

}


/* =========================================================
   ZONAL THEME
   ========================================================= */

function addZonalTheme() {

    if (
        document.getElementById(
            "geoZonalGeneratedStyle"
        )
    ) {
        return;
    }


    const style =
        document.createElement("style");


    style.id =
        "geoZonalGeneratedStyle";


    style.textContent = `

        #zonalDashboard {

            min-height: 100vh;

            padding-left:
                255px;

            overflow-y:
                auto;

            background:
                radial-gradient(
                    circle at 72% 10%,
                    rgba(112,94,230,.18),
                    transparent 28%
                ),
                linear-gradient(
                    145deg,
                    #080914,
                    #11112b 52%,
                    #0a1020
                );

            color:
                #f2efff;

        }


        #zonalDashboard
        .dashboard-topbar {

            position:
                relative;

            z-index:
                2;

            min-height:
                82px;

            padding:
                16px 28px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;

            gap:
                20px;

            background:
                rgba(9,9,23,.92);

            border-bottom:
                1px solid
                rgba(151,132,233,.12);

            backdrop-filter:
                blur(14px);

        }


        #zonalDashboard
        .dashboard-logo {

            display:
                flex;

            align-items:
                center;

            gap:
                10px;

        }


        #zonalDashboard
        .logo-icon {

            width:
                40px;

            height:
                40px;

            display:
                grid;

            place-items:
                center;

            border-radius:
                12px;

            background:
                rgba(143,122,235,.12);

            color:
                #a18af3;

            border:
                1px solid
                rgba(143,122,235,.2);

        }


        #zonalDashboard
        .dashboard-logo strong {

            display:
                block;

            color:
                #f4f0ff;

            font-size:
                14px;

        }


        #zonalDashboard
        .dashboard-logo span:not(.logo-icon) {

            display:
                block;

            margin-top:
                3px;

            color:
                #8479a8;

            font-size:
                8px;

            letter-spacing:
                1.4px;

        }


        #zonalDashboard
        .dashboard-live {

            display:
                flex;

            align-items:
                center;

            gap:
                7px;

            color:
                #8fa7ff;

            font-size:
                9px;

            font-weight:
                800;

            letter-spacing:
                1px;

        }


        #zonalDashboard
        .dashboard-live span,
        #zonalDashboard
        .zonal-online span {

            width:
                7px;

            height:
                7px;

            border-radius:
                50%;

            background:
                #7dffdb;

            box-shadow:
                0 0 10px
                rgba(125,255,219,.7);

        }


        #zonalDashboard
        .dashboard-user {

            display:
                flex;

            align-items:
                center;

            gap:
                14px;

        }


        #zonalDashboard
        .dashboard-user strong {

            display:
                block;

            color:
                #f0edff;

            font-size:
                12px;

        }


        #zonalDashboard
        .dashboard-user small {

            display:
                block;

            margin-top:
                2px;

            color:
                #82799d;

            font-size:
                7px;

            letter-spacing:
                1px;

        }


        #zonalDashboard
        .dashboard-exit {

            padding:
                9px 14px;

            border:
                1px solid
                rgba(255,255,255,.09);

            border-radius:
                10px;

            background:
                rgba(255,255,255,.04);

            color:
                #dcd8e8;

            cursor:
                pointer;

        }


        #zonalDashboard
        .zonal-content {

            width:
                min(1180px, calc(100% - 50px));

            margin:
                auto;

            padding:
                42px 0 70px;

        }


        .zonal-hero {

            display:
                flex;

            align-items:
                flex-end;

            justify-content:
                space-between;

            gap:
                30px;

            margin-bottom:
                25px;

        }


        .zonal-kicker {

            color:
                #9b88f4;

            font-size:
                9px;

            font-weight:
                800;

            letter-spacing:
                2px;

        }


        .zonal-hero h1 {

            margin:
                8px 0;

            color:
                #f5f2ff;

            font-size:
                clamp(32px,4vw,52px);

            letter-spacing:
                -2px;

        }


        .zonal-hero h1 span {

            color:
                #9d8af4;

        }


        .zonal-hero p {

            max-width:
                650px;

            color:
                #938ba8;

            line-height:
                1.7;

            font-size:
                13px;

        }


        .zonal-online {

            display:
                flex;

            align-items:
                center;

            gap:
                8px;

            padding:
                10px 14px;

            border-radius:
                11px;

            background:
                rgba(125,255,219,.05);

            border:
                1px solid
                rgba(125,255,219,.10);

            color:
                #7dffdb;

            font-size:
                8px;

            font-weight:
                800;

            letter-spacing:
                1.2px;

        }


        .zonal-stats {

            display:
                grid;

            grid-template-columns:
                repeat(4,1fr);

            gap:
                14px;

            margin-bottom:
                16px;

        }


        .zonal-stat {

            padding:
                20px;

            border-radius:
                16px;

            background:
                linear-gradient(
                    145deg,
                    rgba(24,21,52,.95),
                    rgba(14,14,35,.95)
                );

            border:
                1px solid
                rgba(145,126,224,.13);

        }


        .zonal-stat i {

            color:
                #a28cf4;

            font-size:
                18px;

        }


        .zonal-stat span {

            display:
                block;

            margin-top:
                15px;

            color:
                #7e7594;

            font-size:
                8px;

            letter-spacing:
                1.2px;

        }


        .zonal-stat strong {

            display:
                block;

            margin:
                6px 0 2px;

            color:
                #f2efff;

            font-size:
                27px;

        }


        .zonal-stat small {

            color:
                #8d86a2;

            font-size:
                8px;

        }


        .zonal-grid {

            display:
                grid;

            grid-template-columns:
                1fr 1.25fr;

            gap:
                16px;

            margin-bottom:
                16px;

        }


        .zonal-panel {

            padding:
                23px;

            border-radius:
                18px;

            background:
                linear-gradient(
                    145deg,
                    rgba(25,23,54,.95),
                    rgba(12,13,31,.95)
                );

            border:
                1px solid
                rgba(145,126,224,.13);

            box-shadow:
                0 15px 45px
                rgba(0,0,0,.14);

        }


        .zonal-panel-head {

            display:
                flex;

            align-items:
                flex-start;

            justify-content:
                space-between;

            gap:
                15px;

            margin-bottom:
                20px;

        }


        .zonal-panel-head span {

            color:
                #81789b;

            font-size:
                8px;

            font-weight:
                800;

            letter-spacing:
                1.5px;

        }


        .zonal-panel-head h2 {

            margin:
                5px 0 2px;

            color:
                #f0edff;

            font-size:
                19px;

        }


        .zonal-panel-head small {

            color:
                #8b839f;

        }


        .zonal-risk-badge {

            padding:
                7px 10px;

            border-radius:
                20px;

            background:
                rgba(244,119,104,.10);

            color:
                #ff8178;

            font-size:
                8px;

            font-weight:
                800;

        }


        .zonal-risk-ring {

            width:
                185px;

            height:
                185px;

            margin:
                5px auto 20px;

            display:
                grid;

            place-items:
                center;

            border-radius:
                50%;

            background:
                conic-gradient(
                    #f47768 0 244deg,
                    rgba(255,255,255,.08)
                    244deg 360deg
                );

        }


        .zonal-ring-inner {

            width:
                135px;

            height:
                135px;

            display:
                flex;

            flex-direction:
                column;

            align-items:
                center;

            justify-content:
                center;

            border-radius:
                50%;

            background:
                #101027;

        }


        .zonal-ring-inner strong {

            color:
                #fff4f2;

            font-size:
                34px;

        }


        .zonal-ring-inner span {

            color:
                #837c94;

            font-size:
                7px;

            letter-spacing:
                1px;

        }


        .zonal-risk-bar {

            height:
                8px;

            overflow:
                hidden;

            border-radius:
                8px;

            background:
                rgba(255,255,255,.07);

        }


        .zonal-risk-bar div {

            height:
                100%;

            border-radius:
                8px;

            background:
                linear-gradient(
                    90deg,
                    #7dffdb,
                    #f3b544,
                    #f47768
                );

        }


        .zonal-message {

            margin-top:
                15px;

            color:
                #9b93a9;

            font-size:
                12px;

            line-height:
                1.6;

        }


        .environment-grid {

            display:
                grid;

            grid-template-columns:
                repeat(2,1fr);

            gap:
                11px;

        }


        .environment-grid > div {

            padding:
                17px;

            border-radius:
                13px;

            background:
                rgba(255,255,255,.035);

            border:
                1px solid
                rgba(255,255,255,.055);

        }


        .environment-grid i {

            color:
                #9d8af4;

            margin-bottom:
                10px;

        }


        .environment-grid span {

            display:
                block;

            color:
                #827a96;

            font-size:
                8px;

        }


        .environment-grid strong {

            display:
                block;

            margin-top:
                4px;

            color:
                #eeeaff;

            font-size:
                17px;

        }


        .zonal-alert-panel {

            margin-bottom:
                16px;

        }


        .zonal-alert-live {

            color:
                #7dffdb !important;

        }


        .zonal-alert-content {

            display:
                flex;

            align-items:
                center;

            gap:
                15px;

            padding:
                16px;

            border-radius:
                13px;

            background:
                rgba(244,119,104,.07);

            border:
                1px solid
                rgba(244,119,104,.12);

        }


        .zonal-alert-icon {

            width:
                46px;

            height:
                46px;

            display:
                grid;

            place-items:
                center;

            border-radius:
                12px;

            background:
                rgba(244,119,104,.10);

            color:
                #ff8178;

        }


        .zonal-alert-content strong {

            color:
                #f6eeee;

            font-size:
                13px;

        }


        .zonal-alert-content p {

            margin-top:
                4px;

            color:
                #958c9b;

            font-size:
                11px;

        }


        .zonal-timeline {

            display:
                grid;

            gap:
                2px;

        }


        .zonal-timeline > div {

            display:
                flex;

            align-items:
                center;

            gap:
                14px;

            padding:
                13px 5px;

            border-bottom:
                1px solid
                rgba(255,255,255,.05);

        }


        .timeline-dot {

            width:
                9px;

            height:
                9px;

            border-radius:
                50%;

            background:
                #9d8af4;

            box-shadow:
                0 0 10px
                rgba(157,138,244,.5);

        }


        .zonal-timeline strong {

            display:
                block;

            color:
                #eae6f4;

            font-size:
                11px;

        }


        .zonal-timeline small {

            display:
                block;

            margin-top:
                3px;

            color:
                #81798c;

            font-size:
                8px;

        }


        @media(max-width:900px) {

            #zonalDashboard {

                padding-left:
                    0;

                padding-bottom:
                    80px;

            }


            #zonalDashboard
            .dashboard-live {

                display:
                    none;

            }


            #zonalDashboard
            .zonal-content {

                width:
                    calc(100% - 30px);

            }


            .zonal-stats {

                grid-template-columns:
                    repeat(2,1fr);

            }


            .zonal-grid {

                grid-template-columns:
                    1fr;

            }

        }


        @media(max-width:600px) {

            #zonalDashboard
            .dashboard-topbar {

                padding:
                    14px;

            }


            #zonalDashboard
            .dashboard-user {

                gap:
                    6px;

            }


            .zonal-hero {

                flex-direction:
                    column;

                align-items:
                    flex-start;

            }


            .zonal-stats {

                grid-template-columns:
                    1fr;

            }


            .environment-grid {

                grid-template-columns:
                    1fr;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


/* =========================================================
   CREATE GOVERNMENT MAP
   ========================================================= */

function improveGovernmentMap() {

    const dashboard =
        $("governmentDashboard");


    if (!dashboard) return;


    let map =
        dashboard.querySelector(
            ".geo-clean-map"
        );


    if (map) return;


    const panels =
        dashboard.querySelectorAll(
            ".gov-panel"
        );


    let mapHost = null;


    for (const panel of panels) {

        const heading =
            panel.querySelector(
                "h3"
            );


        if (
            heading &&
            heading.textContent
                .toLowerCase()
                .includes("risk map")
        ) {

            mapHost = panel;

            break;

        }

    }


    if (!mapHost) {

        mapHost =
            panels[0];

    }


    if (!mapHost) return;


    const oldMap =
        mapHost.querySelector(
            ".gov-map"
        );


    if (oldMap) {

        oldMap.style.display =
            "none";

    }


    map =
        document.createElement(
            "div"
        );


    map.className =
        "geo-clean-map";


    map.innerHTML = `

        <div class="geo-map-grid"></div>

        <div class="geo-map-shape"></div>

        <div class="geo-map-point map-point-a">
            <span></span>
            ASSAM
        </div>

        <div class="geo-map-point map-point-b">
            <span></span>
            MEGHALAYA
        </div>

        <div class="geo-map-point map-point-c">
            <span></span>
            MIZORAM
        </div>

        <div class="geo-map-point map-point-d">
            <span></span>
            ARUNACHAL
        </div>

        <div class="geo-map-legend">

            <span>
                <i class="map-low"></i>
                LOW
            </span>

            <span>
                <i class="map-medium"></i>
                MODERATE
            </span>

            <span>
                <i class="map-high"></i>
                HIGH
            </span>

            <span>
                <i class="map-critical"></i>
                CRITICAL
            </span>

        </div>

    `;


    mapHost.appendChild(
        map
    );


    if (
        !document.getElementById(
            "geoCleanMapStyle"
        )
    ) {

        const style =
            document.createElement(
                "style"
            );


        style.id =
            "geoCleanMapStyle";


        style.textContent = `

            .geo-clean-map {

                position:
                    relative;

                height:
                    360px;

                margin-top:
                    15px;

                overflow:
                    hidden;

                border-radius:
                    16px;

                background:
                    radial-gradient(
                        circle at 55% 38%,
                        rgba(
                            54,
                            183,
                            164,
                            .16
                        ),
                        transparent 34%
                    ),
                    linear-gradient(
                        145deg,
                        #0b2026,
                        #07151c
                    );

                border:
                    1px solid
                    rgba(
                        71,
                        176,
                        178,
                        .13
                    );

            }


            .geo-map-grid {

                position:
                    absolute;

                inset:
                    0;

                opacity:
                    .35;

                background-image:
                    linear-gradient(
                        rgba(
                            95,
                            184,
                            186,
                            .08
                        )
                        1px,
                        transparent
                        1px
                    ),
                    linear-gradient(
                        90deg,
                        rgba(
                            95,
                            184,
                            186,
                            .08
                        )
                        1px,
                        transparent
                        1px
                    );

                background-size:
                    38px 38px;

            }


            .geo-map-shape {

                position:
                    absolute;

                width:
                    520px;

                height:
                    245px;

                left:
                    12%;

                top:
                    16%;

                transform:
                    rotate(
                        -7deg
                    );

                border-radius:
                    48% 30% 50% 35%;

                background:
                    linear-gradient(
                        135deg,
                        rgba(
                            43,
                            158,
                            151,
                            .52
                        ),
                        rgba(
                            28,
                            89,
                            126,
                            .44
                        )
                    );

                clip-path:
                    polygon(
                        4% 35%,
                        18% 15%,
                        35% 10%,
                        48% 23%,
                        64% 7%,
                        87% 18%,
                        95% 40%,
                        79% 51%,
                        90% 73%,
                        68% 86%,
                        51% 69%,
                        35% 93%,
                        17% 75%,
                        7% 56%
                    );

                border:
                    1px solid
                    rgba(
                        114,
                        229,
                        210,
                        .22
                    );

            }


            .geo-map-point {

                position:
                    absolute;

                z-index:
                    2;

                display:
                    flex;

                align-items:
                    center;

                gap:
                    7px;

                color:
                    #d7ece8;

                font-size:
                    10px;

                font-weight:
                    800;

                letter-spacing:
                    .7px;

            }


            .geo-map-point span {

                width:
                    10px;

                height:
                    10px;

                border-radius:
                    50%;

                box-shadow:
                    0 0 0 5px
                    rgba(
                        255,
                        255,
                        255,
                        .05
                    );

            }


            .map-point-a {

                top:
                    22%;

                left:
                    51%;

            }


            .map-point-a span {

                background:
                    #f47768;

                box-shadow:
                    0 0 15px
                    rgba(
                        244,
                        119,
                        104,
                        .75
                    );

            }


            .map-point-b {

                top:
                    49%;

                left:
                    60%;

            }


            .map-point-b span {

                background:
                    #f3b544;

                box-shadow:
                    0 0 15px
                    rgba(
                        243,
                        181,
                        68,
                        .65
                    );

            }


            .map-point-c {

                top:
                    67%;

                left:
                    67%;

            }


            .map-point-c span {

                background:
                    #39d6ba;

                box-shadow:
                    0 0 15px
                    rgba(
                        57,
                        214,
                        186,
                        .65
                    );

            }


            .map-point-d {

                top:
                    26%;

                right:
                    7%;

            }


            .map-point-d span {

                background:
                    #ef7416;

                box-shadow:
                    0 0 15px
                    rgba(
                        239,
                        116,
                        22,
                        .65
                    );

            }


            .geo-map-legend {

                position:
                    absolute;

                left:
                    16px;

                bottom:
                    16px;

                display:
                    flex;

                flex-wrap:
                    wrap;

                gap:
                    13px;

                padding:
                    10px 12px;

                border-radius:
                    10px;

                background:
                    rgba(
                        5,
                        18,
                        24,
                        .82
                    );

                border:
                    1px solid
                    rgba(
                        255,
                        255,
                        255,
                        .07
                    );

                color:
                    #789196;

                font-size:
                    7px;

                font-weight:
                    800;

                letter-spacing:
                    1px;

            }


            .geo-map-legend span {

                display:
                    flex;

                align-items:
                    center;

                gap:
                    5px;

            }


            .geo-map-legend i {

                width:
                    7px;

                height:
                    7px;

                border-radius:
                    50%;

            }


            .map-low {
                background: #39d6ba;
            }

            .map-medium {
                background: #f3b544;
            }

            .map-high {
                background: #f47768;
            }

            .map-critical {
                background: #d9415b;
            }


            @media(max-width:600px) {

                .geo-clean-map {

                    height:
                        280px;

                }

                .geo-map-shape {

                    width:
                        390px;

                }

                .geo-map-point {

                    font-size:
                        8px;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }

}


/* =========================================================
   INITIALIZE EXTRA FEATURES
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        ensureZonalDashboard();

        addZonalTheme();

        improveGovernmentMap();

        setTimeout(
            refreshNavigator,
            700
        );

    }
);


/* =========================================================
   PUBLIC SESSION AREA HELPERS
   ========================================================= */

function getPublicSession() {

    try {

        return JSON.parse(
            sessionStorage.getItem(
                "publicUser"
            )
        );

    } catch (error) {

        return null;

    }

}


/* =========================================================
   PUBLIC LOCATION LABEL
   ========================================================= */

function resolveDemoArea(
    latitude,
    longitude
) {

    if (
        latitude >= 25 &&
        latitude <= 26 &&
        longitude >= 91 &&
        longitude <= 92
    ) {

        return "Assam / Dima Hasao";

    }


    if (
        latitude >= 24 &&
        latitude < 25 &&
        longitude >= 91 &&
        longitude <= 92
    ) {

        return "Meghalaya Region";

    }


    return "Your Current Area";

}


/* =========================================================
   UPDATE PUBLIC SESSION WITH AREA
   ========================================================= */

function savePublicArea() {

    const user =
        getPublicSession();


    if (!user) return;


    const area =
        resolveDemoArea(
            user.latitude,
            user.longitude
        );


    user.area =
        area;


    sessionStorage.setItem(

        "publicUser",

        JSON.stringify(user)

    );


    updatePublicArea();

}


/* =========================================================
   RUN AREA RESOLUTION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        savePublicArea();

    }
);


/* =========================================================
   FINAL READY STATE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document.body.classList.add(
            "geoguard-ready"
        );

    }
);


/* =========================================================
   END OF CLEAN SCRIPT
   ========================================================= */

/* =========================================================
   GEOGUARD FINAL HOTFIX
   ========================================================= */

/* REAL portal hide — CSS in the existing stylesheet does not define this class. */
const geoHotfixStyle = document.createElement("style");
geoHotfixStyle.id = "geoGuardFinalHotfixStyle";
geoHotfixStyle.textContent = `
    #accessPortal.portal-hidden {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
    }

    /* The existing CSS already gives the dashboard 255px sidebar space,
       so its children must NOT add another 250px margin. */
    .geo-dashboard-with-sidebar .gov-content,
    .geo-dashboard-with-sidebar .dashboard-content {
        margin-left: 0 !important;
        margin-right: 0 !important;
        max-width: none !important;
        width: 100% !important;
        padding-left: 32px !important;
        padding-right: 32px !important;
        box-sizing: border-box !important;
    }

    #governmentDashboard .gov-user-info strong,
    #governmentDashboard .gov-user strong,
    #governmentDashboard .dashboard-user strong {
        color: #173746 !important;
        opacity: 1 !important;
        visibility: visible !important;
    }

    #governmentDashboard .gov-user-info span,
    #governmentDashboard .gov-user-info small,
    #governmentDashboard .dashboard-user small {
        color: #078f88 !important;
        opacity: 1 !important;
        visibility: visible !important;
    }

    @media (max-width: 900px) {
        .geo-dashboard-with-sidebar .gov-content,
        .geo-dashboard-with-sidebar .dashboard-content {
            padding-left: 18px !important;
            padding-right: 18px !important;
        }
    }
`;
document.head.appendChild(geoHotfixStyle);


/* =========================================================
   FORCE DASHBOARD SWITCH
   ========================================================= */
function geoForceOpenDashboard(role) {

    const config = ROLE_CONFIG[role];
    if (!config) return false;

    const dashboard = $(config.dashboard);
    if (!dashboard) return false;

    hideAllDashboards();

    const portal = $("accessPortal");
    if (portal) {
        portal.classList.add("portal-hidden");
        portal.style.setProperty("display", "none", "important");
    }

    const roleModal = $("roleLoginModal");
    if (roleModal) {
        roleModal.classList.remove("active");
    }

    dashboard.style.setProperty("display", "block", "important");
    dashboard.style.setProperty("visibility", "visible", "important");
    dashboard.style.setProperty("opacity", "1", "important");
    dashboard.style.setProperty("z-index", "99998", "important");

    updateGeoHeader(role, dashboard);
    createNavigator(dashboard);
    setBodyLocked(true);

    return true;
}


/* =========================================================
   HEADER USER NAME / SUBTITLE
   ========================================================= */
function updateGeoHeader(role, dashboard) {

    if (!dashboard) return;

    let name = "GeoGuard User";
    let subtitle = "AUTHORIZED ACCESS";

    if (role === "government") {
        name = "Government Administrator";
        subtitle = "FULL SYSTEM ACCESS";
    }

    if (role === "station") {
        name = "Station Head";
        subtitle = "HEADQUARTERS";
    }

    if (role === "zonal") {
        name = "Zonal Head";
        subtitle = "ASSIGNED ZONE";
    }

    if (role === "public") {
        const user = getGeoPublicUser();
        name = user?.email || "Public User";
        subtitle = user?.area || "CURRENT AREA";
    }

    dashboard.querySelectorAll(
        ".gov-user-info strong, .dashboard-user strong"
    ).forEach(el => {
        el.textContent = name;
    });

    dashboard.querySelectorAll(
        ".gov-user-info span, .gov-user-info small, .dashboard-user small"
    ).forEach(el => {
        el.textContent = subtitle;
    });
}


function getGeoPublicUser() {
    try {
        return JSON.parse(
            sessionStorage.getItem("publicUser")
        );
    } catch (error) {
        return null;
    }
}


/* =========================================================
   FINAL ROLE LOGIN HANDLER
   ========================================================= */
window.handlePortalLogin = function (event) {

    if (event) event.preventDefault();

    const config = ROLE_CONFIG[selectedRole];
    const username = $("portalUsername")?.value.trim() || "";
    const password = $("portalPassword")?.value.trim() || "";
    const error = $("portalLoginError");

    if (!config) {
        if (error) error.textContent = "Please select an access role.";
        return false;
    }

    if (
        username !== config.username ||
        password !== config.password
    ) {
        if (error) error.textContent = "Invalid username or password.";
        return false;
    }

    sessionStorage.setItem(
        "geoGuardRole",
        selectedRole
    );

    return geoForceOpenDashboard(
        selectedRole
    );
};


/* =========================================================
   FINAL PUBLIC LOGIN
   ========================================================= */
window.continuePublicAccess = function () {

    const gmail =
        $("publicGmail")?.value.trim() || "";

    const error =
        $("publicLoginError");

    if (!gmail) {
        if (error) error.textContent = "Please enter your Gmail ID.";
        return false;
    }

    if (!gmail.toLowerCase().endsWith("@gmail.com")) {
        if (error) error.textContent = "Please enter a valid Gmail ID.";
        return false;
    }

    if (
        !publicLocation ||
        !Number.isFinite(Number(publicLocation.latitude)) ||
        !Number.isFinite(Number(publicLocation.longitude))
    ) {
        if (error) {
            error.textContent =
                "Please allow current location first.";
        }
        return false;
    }

    const latitude =
        Number(publicLocation.latitude);

    const longitude =
        Number(publicLocation.longitude);

    const area =
        resolveDemoArea(
            latitude,
            longitude
        );

    sessionStorage.setItem(
        "publicUser",
        JSON.stringify({
            email: gmail,
            latitude: latitude,
            longitude: longitude,
            area: area
        })
    );

    sessionStorage.setItem(
        "geoGuardRole",
        "public"
    );

    return geoForceOpenDashboard(
        "public"
    );
};


/* =========================================================
   FINAL PUBLIC LOCATION HANDLER
   ========================================================= */
window.requestPublicLocation = function () {

    const error = $("publicLoginError");

    if (error) error.textContent = "";

    if (!navigator.geolocation) {
        setLocationUI(
            "Geolocation is not supported by this browser.",
            "Unavailable",
            false,
            false
        );
        return;
    }

    const localhost =
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1" ||
        location.hostname === "::1";

    if (!window.isSecureContext && !localhost) {
        setLocationUI(
            "Location requires HTTPS or localhost.",
            "Use HTTPS",
            false,
            false
        );
        return;
    }

    setLocationUI(
        "Checking your current location...",
        "Checking...",
        true,
        false
    );

    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude =
                Number(position.coords.latitude);

            const longitude =
                Number(position.coords.longitude);

            const accuracy =
                Number(position.coords.accuracy || 0);

            if (
                !Number.isFinite(latitude) ||
                !Number.isFinite(longitude)
            ) {
                setLocationUI(
                    "Invalid GPS data received.",
                    "Try Again",
                    false,
                    false
                );
                return;
            }

            publicLocation = {
                latitude,
                longitude,
                accuracy
            };

            sessionStorage.setItem(
                "geoGuardLocation",
                JSON.stringify(publicLocation)
            );

            sessionStorage.setItem(
                "geoGuardDetectedArea",
                resolveDemoArea(
                    latitude,
                    longitude
                )
            );

            setLocationUI(
                "Location access granted ✓",
                "Location Granted ✓",
                false,
                true
            );

            if (error) error.textContent = "";

            showLocationDetails();
        },

        function (geoError) {

            publicLocation = null;

            let message =
                "Unable to get your location.";

            if (geoError?.code === 1) {
                message =
                    "Location is blocked. Allow Location for this site in Chrome, then press Allow Location again.";
            }

            if (geoError?.code === 2) {
                message =
                    "Location is unavailable. Check GPS/Wi-Fi and try again.";
            }

            if (geoError?.code === 3) {
                message =
                    "Location request timed out. Press Allow Location again.";
            }

            setLocationUI(
                message,
                "Allow Location",
                false,
                false
            );

            if (error) error.textContent = message;
        },

        {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 300000
        }
    );
};


/* =========================================================
   FINAL PUBLIC ACCESS OPEN
   ========================================================= */
window.openPublicAccess = function () {

    const modal = $("publicAccessModal");
    const gmail = $("publicGmail");
    const error = $("publicLoginError");

    if (gmail) gmail.value = "";
    if (error) error.textContent = "";

    restoreSavedLocation();
    ensureLocationDetailsUI();
    refreshLocationState();

    if (modal) {
        modal.classList.add("active");
    }

    setBodyLocked(true);
};



/* =========================================================
   SAFE DASHBOARD INITIALIZER
   ========================================================= */
function initializeDashboards() {

    const ids = [
        "governmentDashboard",
        "stationDashboard",
        "zonalDashboard",
        "publicDashboard"
    ];

    ids.forEach(function (id) {

        const dashboard = $(id);

        if (
            dashboard &&
            !dashboard.querySelector(".geo-sidebar")
        ) {
            createNavigator(dashboard);
        }

    });
}


/* =========================================================
   FINAL DASHBOARD INITIALIZATION
   ========================================================= */
document.addEventListener(
    "DOMContentLoaded",
    function () {

        ensureZonalDashboard();
        initializeDashboards();
        restoreSavedLocation();
        ensureLocationDetailsUI();
        refreshLocationState();

        const role =
            sessionStorage.getItem(
                "geoGuardRole"
            );

        if (
            role === "public" &&
            getGeoPublicUser()
        ) {

            setTimeout(
                function () {
                    geoForceOpenDashboard("public");
                },
                80
            );

        } else {

            showPortal();

        }

    }
);
})();
/* =========================================================
   PUBLIC LOGIN - FINAL FIX
   ========================================================= */

window.openPublicAccess = function () {
    const modal = document.getElementById("publicAccessModal");

    if (!modal) {
        console.error("ERROR: #publicAccessModal not found in HTML");
        alert("Public Login modal is missing from the page.");
        return;
    }

    // Reset fields
    const gmail = document.getElementById("publicGmail");
    const error = document.getElementById("publicLoginError");

    if (gmail) gmail.value = "";
    if (error) error.textContent = "";

    // Show modal
    modal.classList.add("active");

    // Force visibility
    modal.style.display = "flex";
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
    modal.style.pointerEvents = "auto";
    modal.style.zIndex = "999999";

    document.body.style.overflow = "hidden";

    // Restore previously saved location if available
    try {
        restoreSavedLocation();
    } catch (e) {
        console.warn("Location restore skipped:", e);
    }

    try {
        ensureLocationDetailsUI();
        refreshLocationState();
    } catch (e) {
        console.warn("Location UI refresh skipped:", e);
    }

    // Focus Gmail field
    setTimeout(() => {
        if (gmail) gmail.focus();
    }, 100);
};


window.closePublicAccess = function () {
    const modal = document.getElementById("publicAccessModal");

    if (modal) {
        modal.classList.remove("active");

        modal.style.display = "none";
        modal.style.visibility = "hidden";
        modal.style.opacity = "0";
        modal.style.pointerEvents = "none";
    }

    document.body.style.overflow = "";
};


/* Force modal CSS */
const publicLoginFixStyle = document.createElement("style");

publicLoginFixStyle.textContent = `
    #publicAccessModal {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;

        display: none;
        align-items: center !important;
        justify-content: center !important;

        background: rgba(0, 0, 0, 0.72) !important;

        z-index: 999999 !important;
    }

    #publicAccessModal.active {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
    }
`;

document.head.appendChild(publicLoginFixStyle);
/* ===== PUBLIC LOGIN FINAL FIX ===== */

window.handlePublicLogin = function () {

    const gmailInput = document.getElementById("publicGmail");
    const error = document.getElementById("publicLoginError");

    const gmail = gmailInput
        ? gmailInput.value.trim().toLowerCase()
        : "";

    if (error) error.textContent = "";

    // Check Gmail
    if (!gmail) {
        if (error) error.textContent = "Please enter your Gmail ID.";
        return;
    }

    if (!gmail.endsWith("@gmail.com")) {
        if (error) error.textContent = "Please enter a valid Gmail ID.";
        return;
    }

    // Get location
    let locationData = publicLocation;

    if (!locationData) {
        try {
            locationData = JSON.parse(
                sessionStorage.getItem("geoGuardLocation")
            );
        } catch (e) {
            locationData = null;
        }
    }

    if (
        !locationData ||
        !Number.isFinite(Number(locationData.latitude)) ||
        !Number.isFinite(Number(locationData.longitude))
    ) {
        if (error) {
            error.textContent =
                "Please allow current location first.";
        }
        return;
    }

    const latitude = Number(locationData.latitude);
    const longitude = Number(locationData.longitude);

    // Save public user
    const user = {
        email: gmail,
        latitude: latitude,
        longitude: longitude,
        area: resolveDemoArea(latitude, longitude)
    };

    sessionStorage.setItem(
        "publicUser",
        JSON.stringify(user)
    );

    sessionStorage.setItem(
        "geoGuardRole",
        "public"
    );

    // Close login modal
    const modal = document.getElementById("publicAccessModal");

    if (modal) {
        modal.classList.remove("active");
        modal.style.display = "none";
    }

    // Hide portal
    const portal = document.getElementById("accessPortal");

    if (portal) {
        portal.style.display = "none";
        portal.classList.add("portal-hidden");
    }

    // Hide every dashboard
    [
        "governmentDashboard",
        "stationDashboard",
        "zonalDashboard",
        "publicDashboard"
    ].forEach(id => {
        const el = document.getElementById(id);

        if (el) {
            el.style.display = "none";
        }
    });

    // OPEN PUBLIC DASHBOARD
    const dashboard =
        document.getElementById("publicDashboard");

    if (!dashboard) {
        console.error(
            "publicDashboard element not found!"
        );

        if (error) {
            error.textContent =
                "Public dashboard is missing.";
        }

        return;
    }

    dashboard.style.display = "block";
    dashboard.style.visibility = "visible";
    dashboard.style.opacity = "1";
    dashboard.style.zIndex = "99999";

    document.body.style.overflow = "auto";

    // Update public dashboard user information
    try {
        updateGeoHeader("public", dashboard);
    } catch (e) {
        console.warn(e);
    }

    console.log("PUBLIC LOGIN SUCCESS");
    console.log(user);
};