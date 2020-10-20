window.onload=cargado;
function cargado(){
    document.primero.nif_cif.onchange=nif_cif;
}

function nif_cif()
{
    //var cod=esNif(document.primero.nif_cif.value.toString().toUpperCase());
    var code=esCif(document.primero.nif_cif.value.toString().toUpperCase());
    if (code<5 && code>0)
    alert (code);
    alert ("Nooooo");
    
}
//var niMayus=document.primero.nif.value.toString().toUpperCase();
/*
1 -> Se ha introducido un NIF correcto.
2 -> Se ha introducido un NIF erróneo. El carácter de control es
erróneo.
3 -> Se ha introducido un DNI, se ha pasado un número de entre 6 y
8 dígitos con un valor mínimo de 100000.
4 -> Se ha introducido un dato no válido. No es NIF ni un DNI.
 */
function esNif(cadena)
{
    var letras=["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
    //Primera forma Ocho dígitos y el carácter de control que va a ser una letra. 
    var primF = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    //2ª forma En la primera posición una letra que puede ser: X, Y, Z, L, K, M; a
        //continuación siete dígitos y el carácter de control que va a ser una letra.
    var segF = /^[XYZLKM]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    //un número de entre 6 y 8 dígitos
    var dig = /^[0-9]{6,8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var letra= cadena.substr(-1);
    if (primF.test(cadena))
    if (letras[parseInt(cadena.substr(0, 8))%23]==letra)
    return 1;
    else return 2;
    else if (segF.test(cadena))
    {
        //remplaza la letra por el numero correspondiente
        cadena=cadena 
                        .replace(/^[X]/, '0')	
                        .replace(/^[Y]/, '1') 
                        .replace(/^[Z]/, '2') 
                        .replace(/^[L]/, '3') 
                        .replace(/^[K]/, '4') 
                        .replace(/^[M]/, '5');
        if (letras[parseInt(cadena.substr(0, 8))%23]==letra)
        return 1;
        else return 2;
    }
    else if (dig.test(cadena))
    {
        if (parseInt(cadena.substr(0, 8))>=100000 &&letras[parseInt(cadena.substr(0, 8))%23]==letra)
        return 3;
    }
    return 4;
}
/*
1 -> Se ha introducido un cif correcto.
2 -> Se ha introducido un cif erróneo. El carácter de control es erróneo.
3 -> Se ha introducido un dato no válido. No es CIF.
*/
function esCif(cadena)
{
    // 1 forma -> 1 letra - 7 digitos - un numero de control
    var formato1 = /^[A-H,J,U,V]{1}[0-9]{7}[0-9]$/i;
    // 2 forma -> 1 letra - 7 digitos - una letra de control
    var formato2 = /^[P,Q,R,S,W]{1}[0-9]{7}[A-J]$/i;
    var letrasC="JABCDEFGHI";
    alert ("control");
    if (formato1.test(cadena) || formato2.test(cadena))
    {
        var dig7 = cadena.substr(1,7);
        var suma=0;
        //alert (3%2);
        //alert (dig7);
        var i;
        var dig;
        for ( i=1; i <= dig7.length; i++){
            //alert(i);
            //alert (dig7.length);
            dig=dig7.substr((i-1),1);//mal
            //alert (ig7.length);
            alert(dig);
            if (i%2 != 0)//Si es impar entra
            {
                
                dig*=2;
                alert(dig);
                if (dig > 9)
                   { 
                       alert("dddd");
                       dig=dig.toString();
                       alert(dig);
                       dig=(parseInt)(dig.charAt(0))+(parseInt)(dig.charAt(1));//suma los digitos
                       alert("sssss");
                   }
                alert(dig);
            }
            //suma los par y los impares*2
            suma+=dig;
        }
        var resto=suma%10;
        resto=10-resto;
        if (resto==10)
            resto=0;
        var control=cadena.substr(-1);
        alert ("control3");
        if (letrasC.substr(resto,1)==control)
            return 1;//cif correcto por control letra
        else if (resto==control)
            return 1;//cif correcto por control numero
        else return 2;//cif incorrecto por el cararter
    }
    return 3;
}
