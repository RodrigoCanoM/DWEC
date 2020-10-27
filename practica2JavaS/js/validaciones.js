window.onload=cargado;
function cargado(){
    document.primero.nif_cif.onchange=nif_cif;
}
/*
C1 Se ha introducido un cif correcto.
C2 Se ha introducido un cif erróneo. El carácter de control es
	erróneo.
N1 Se ha introducido un NIF correcto
N2 Se ha introducido un NIF erróneo. El carácter de control es
	erróneo.
N3 Se ha introducido un DNI, se ha pasado un número de entre 6
	y 8 dígitos con un valor mínimo de 100000.
0 Se ha introducido un dato no válido. No es CIF.
*/

function nif_cif()
{
    let Nif= /^[XYZLKM0-9]/;
    let Cif= /^[A-HJUVPQRSW]/;
    let cadena=document.primero.nif_cif.value.toString().toUpperCase()
    if (Nif.test(cadena))
    {
        let V=esNif(document.primero.nif_cif.value.toString().toUpperCase());
        if (V==4) return 0;
        else return "N"+V;//retorna N1, N2 o N3 
    }
    else if (Cif.test(cadena))
    {
        let V=esCif(document.primero.nif_cif.value.toString().toUpperCase());
        if (V==3) return 0;
        else return "C"+V;//retorna C1 o C2
    }
    else return "0";
}
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
    let letras=["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
    //Primera forma Ocho dígitos y el carácter de control que va a ser una letra. 
    let primF = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/i;
    //2ª forma En la primera posición una letra que puede ser: X, Y, Z, L, K, M; a
        //continuación siete dígitos y el carácter de control que va a ser una letra.
    let segF = /^[XYZLKM]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    //un número de entre 6 y 8 dígitos
    let dig = /^[0-9]{6,8}$/i;//dni antiguo solo tiene de 6 a 8 numeros y sin letra de control
    let letra= cadena.substr(-1);
    if (primF.test(cadena))
        if (letras[parseInt(cadena.substr(0, 8))%23]==letra)//verdadero si es nif que empiesa por una letra y es correcto
            return 1;
        else return 2;
    else if (segF.test(cadena))
    {
        //remplaza la letra por el numero correspondiente 
       cadena=cadena    .replace(/^[X]/, '0')	
                        .replace(/^[Y]/, '1') 
                        .replace(/^[Z]/, '2') 
                        .replace(/^[L]/, '3') 
                        .replace(/^[K]/, '4') 
                        .replace(/^[M]/, '5');
        if (letras[parseInt(cadena.substr(0, 8))%23]==letra)//verdadero si es nif que empiesa por un numero y es correcto
            return 1;
        else return 2;
    }
    else if (dig.test(cadena))
        if (parseInt(cadena.substr(0, 8))>=100000)//verdadero si es dni y es mayor 100000
            return 3;
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
    let formato1 = /^[A-HJUV]{1}[0-9]{7}[0-9]$/i;
    // 2 forma -> 1 letra - 7 digitos - una letra de control
    let formato2 = /^[PQRSW]{1}[0-9]{7}[A-J]$/i;
    let letrasC="JABCDEFGHI";
    if (formato1.test(cadena) || formato2.test(cadena))//Obtiene los formatos
    {
        let dig7 = cadena.substr(1,7);
        let suma=0;
        let i;
        let dig;
        for ( i=1; i <= dig7.length; i++){
            dig=dig7.substr((i-1),1);//si empiezo por cero el if coje el primer digito y solo debe cojer los pares
            if (i%2 != 0)//Si es impar entra
            {
                dig*=2;
                if (dig > 9)
                   { 
                       dig=dig.toString();
                       dig=(parseInt)(dig.charAt(0))+(parseInt)(dig.charAt(1));//suma los digitos
                   }
                //alert(dig);
            }
            //suma los par y los impares*2
            suma+=parseInt(dig);
        }
        let resto=suma%10;
        resto=10-resto;
        if (resto==10)
            resto=0;
        let control=cadena.substr(-1);
        if (letrasC.substr(resto,1)==control)
            return 1;//cif correcto por control letra
        else if (resto==control)
            return 1;//cif correcto por control numero
        else return 2;//cif incorrecto por el cararter
    }
    return 3;
}//15232144
