/* global matrice */

window.onload = function ()
{
    var g= new gestore();
};

function gestore()
{    
    controlloVittoria= function(giocatore)
    {
        var vittoria= false;
        var contaMosseAdiacenti;

        for (var r = 0; r < 3 && !vittoria; r++) {
            contaMosseAdiacenti = 0;
            for (var c = 0; c < 3 && !vittoria; c++) {
                if (matrice[r][c].giocatore === giocatore) {
                    contaMosseAdiacenti++;
                }
            }
            if (contaMosseAdiacenti === 3) {
                vittoria = true;
            }
        }
        ///<controllo orizzontale
        
        for (var c = 0; c < 3 && !vittoria; c++) {
            contaMosseAdiacenti = 0;
            for (var r = 0; r < 3 && !vittoria; r++) {
                if (matrice[r][c].giocatore === giocatore) {
                    contaMosseAdiacenti++;
                }
            }
            if (contaMosseAdiacenti === 3) {
                vittoria = true;
            }
        }
        ///<controllo verticale
        
        if (matrice[0][0].giocatore === giocatore && matrice[1][1].giocatore === giocatore && matrice[2][2].giocatore === giocatore && !vittoria) {
            vittoria = true;
        }
        else if (matrice[0][2].giocatore === giocatore && matrice[1][1].giocatore === giocatore && matrice[2][0].giocatore === giocatore && !vittoria) {
            vittoria = true;
        }
        ///<controllo obliquo
        
        return vittoria;
    };
    
    possibileVittoria= function(giocatore)
    {
        var trovatoCoordinate= false;
        var contaMosseAdiacenti;
        var coordinate=null;

        for (var r = 0; r < 3 && !trovatoCoordinate; r++) {
            contaMosseAdiacenti = 0;
            for (var c = 0; c < 3 && !trovatoCoordinate; c++) {
                if (matrice[r][c].giocatore === giocatore) {
                    contaMosseAdiacenti++;
                }
            }
            if (contaMosseAdiacenti === 2) {              
                for (var c1 = 0; c1 < 3; c1++) {
                    if (matrice[r][c1].giocatore === "v") {
                        coordinate={riga:r, colonna:c1};
                        trovatoCoordinate= true;
                    }
                }
            }
        }
        ///<controllo orizzontale
        
        for (var c = 0; c < 3 && !trovatoCoordinate; c++) {
            contaMosseAdiacenti = 0;
            for (var r = 0; r < 3 && !trovatoCoordinate; r++) {
                if (matrice[r][c].giocatore === giocatore) {
                    contaMosseAdiacenti++;
                }
            }
            if (contaMosseAdiacenti === 2) {  
                for (var r1 = 0; r1 < 3; r1++) {
                    if (matrice[r1][c].giocatore === "v") {
                        coordinate={riga:r1, colonna:c};
                        trovatoCoordinate= true;
                    }
                }               
            }
        }
        ///<controllo verticale
        
        if(!trovatoCoordinate)
        {
            contaMosseAdiacenti=0;
            if (matrice[0][0].giocatore === giocatore)contaMosseAdiacenti++;
            if(matrice[1][1].giocatore === giocatore)contaMosseAdiacenti++;
            if(matrice[2][2].giocatore === giocatore)contaMosseAdiacenti++;
            
            if(contaMosseAdiacenti===2)
            {             
                if (matrice[0][0].giocatore === "v")coordinate={riga:0, colonna:0};
                else if(matrice[1][1].giocatore === "v")coordinate={riga:1, colonna:1};
                else if(matrice[2][2].giocatore === "v")coordinate={riga:2, colonna:2};
                if(coordinate!==null)trovatoCoordinate=true;         
            }
        }
        
        if(!trovatoCoordinate)
        {
            contaMosseAdiacenti=0;
            if (matrice[0][2].giocatore === giocatore)contaMosseAdiacenti++;
            if(matrice[1][1].giocatore === giocatore)contaMosseAdiacenti++;
            if(matrice[2][0].giocatore === giocatore)contaMosseAdiacenti++;
            
            if(contaMosseAdiacenti===2)
            {        
                if (matrice[0][2].giocatore === "v")coordinate={riga:0, colonna:2};
                else if(matrice[1][1].giocatore === "v")coordinate={riga:1, colonna:1};
                else if(matrice[2][0].giocatore === "v")coordinate={riga:2, colonna:0}; 
                if(coordinate!==null)trovatoCoordinate=true;
            }
        } 
        return coordinate;
    };
    
    matricePiena= function() 
    {
        var piena = true;
        for (var r = 0; r < 3 && piena; r++) {
            for (var c = 0; c < 3 && piena; c++) {
                if (matrice[r][c].giocatore==="v") {
                    piena = false;
                }
            }
        }
        return piena;
    };
    
    inizializzaMatrice= function()
    {
        var riga1= new Array(new cella("v"),new cella("v"),new cella("v"));
        var riga2= new Array(new cella("v"),new cella("v"),new cella("v"));
        var riga3= new Array(new cella("v"),new cella("v"),new cella("v"));
        return new Array(riga1, riga2, riga3);
    };
    
    mossaComputer= function() 
    {
        window.setTimeout(function()
        {            
            if (!matricePiena() && !vittoria) {
                var selezioneValida = false;
                var riga = 0;
                var colonna = 0;
                
                var coordinate=possibileVittoria("o");
                if(coordinate===null)coordinate=possibileVittoria("x");
                if(coordinate!==null){riga=coordinate.riga; colonna=coordinate.colonna;}      
                else
                {
                    if(matrice[1][1].giocatore==="v"){riga=1; colonna=1;}
                    else
                    {
                        while (!selezioneValida) {
                            riga = Math.round(2*Math.random());
                            colonna = Math.round(2*Math.random());;

                            if (matrice[riga][colonna].giocatore==="v") {
                                selezioneValida = true;
                            }
                        }                        
                    }
                }
                var img= document.getElementById(riga+" "+colonna);
                img.src="o.gif";
                matrice[riga][colonna].giocatore="o";
                              
                vittoria=controlloVittoria("o");
                if(vittoria){grafica.rimuoviP(); alert("vittoria o");}
                else if(matricePiena()){grafica.rimuoviP(); alert("parità");}
                else{mossaGiocatore=true; grafica.scriviTurno("X");}
            }
        }, 600);
    };
     
    callbackTris= function(event)
    {
        if(event.target.coordinate!==undefined && matrice[event.target.coordinate.riga][event.target.coordinate.colonna].giocatore==="v" && !vittoria && mossaGiocatore)
        {    
            event.target.src="x.gif";
            matrice[event.target.coordinate.riga][event.target.coordinate.colonna].giocatore="x";
            grafica.scriviTurno("O");
            
            
            vittoria=controlloVittoria("x");
            if(vittoria){grafica.rimuoviP(); alert("vittoria x");}
            else if(matricePiena()){grafica.rimuoviP(); alert("parità");}
            else{mossaGiocatore=false; mossaComputer();}
        }
    };  
    grafica= new grafica({tipo:"click", callback:callbackTris});
    vittoria= false;
    matrice= inizializzaMatrice();
    
    mossaGiocatore=Math.round(Math.random());
    if(!mossaGiocatore){grafica.scriviTurno("O"); mossaComputer();}
    else grafica.scriviTurno("X");
};

function cella(giocatore)
{
    this.giocatore= giocatore;
}

function grafica(evento)
{
    outMossa= document.createElement("p");
    
    this.scriviTurno= function(giocatore)
    {
        outMossa.innerHTML="turno giocatore "+giocatore+"!";
    };
    
    this.rimuoviP= function()
    {
        outMossa.innerHTML="";
    };
    
    creaTabella = function (righe, colonne, evento)
    {
        var divTabella=document.createElement("div");
        document.body.appendChild(divTabella);       
        var tabella = document.createElement("table");

        var riga;
        var colonna;
        var immagine;            

        for (var r = 0; r < righe; r++)
        {
            riga = tabella.insertRow(-1);
            for (var c = 0; c < colonne; c++)
            {
                colonna = riga.insertCell(-1);
                colonna.addEventListener(evento.tipo, evento.callback);
                immagine= document.createElement("img");
                immagine.src="vuota.gif";
                immagine.id=r+" "+c;
                immagine.coordinate = {riga: r, colonna: c};
                colonna.appendChild(immagine);
            }
        }
        divTabella.appendChild(tabella);
        divTabella.appendChild(outMossa); 
        return tabella;
    }; 
    tabella= creaTabella(3, 3, evento);
};