
const ECivil = [
    { value: 'CASADO' },
    { value: 'SOLTERO'},
    { value: 'UNION LIBRE' },
    { value: 'DIVORCIADO' },
    { value: 'VIUDO' }
];

const Empleo = [
    { value: 'FIJO' },
    { value: 'SUB EMPLEO'},
    { value: 'TEMPORAL' },
    { value: 'NINGUNO' }
];

const Sexo = [
    { value: 'MASCULINO' },
    { value: 'FEMENINO'}
];

const Alimentacion = [
    { value: 'DIARIO' },
    { value: 'C/3 DIA'},
    { value: 'C/8 DIA' },
    { value: 'C/15 DIA' },
    { value: 'A VECES' },
    { value: 'NUNCA' }
];

const CondicionVivienda = [
    { value: 'PROPIA' },
    { value: 'EN PAGO'},
    { value: 'RENTA' },
    { value: 'PRESTADA' }
];

const Zona = [
    { value: 'URBANA' },
    { value: 'SUB URBANA'},
    { value: 'RURAL' }
];

const Menaje = [
    { value: 'EQUIPADO' },
    { value: 'BASICO'},
    { value: 'AUSTERO' }
];

const AtencionMedica = [
    { value: 'IMSS' },
    { value: 'ISSSTE'},
    { value: 'SEGURO POPULAR' },
    { value: 'HOSPITAL CIVIL' },
    { value: 'CRUZ ROJA' },
    { value: 'CRUZ VERDE' },
    { value: 'CENTRO DE SALUD' },
    { value: 'MEDICO PARTICULAR' },
    { value: 'TELETON' },
    { value: 'HOSPITAL GENERAL DE OCCIDENTE' },
    { value: 'OTROS' }
];

const Pronostico = [
    { value: 'FAVORABLE' },
    { value: 'NO FAVORABLE'}
];

const Piso = [
    { value: 'CEMENTO' },
    { value: 'TIERRA'},
    { value: 'MOSAICO' },
    { value: 'VITROPISO' },
    { value: 'MADERA' }
];

const Muro = [
    { value: 'LONA' },
    { value: 'ADOBE'},
    { value: 'LAMINA' },
    { value: 'LADRILLO' },
    { value: 'MADERA' },
    { value: 'BLOCK' },
    { value: 'OTROS' }
];

const Techo = [
    { value: 'LAMINA' },
    { value: 'BOVEDA'},
    { value: 'LAMINA' },
    { value: 'MADERA' },
    { value: 'LONA' },
    { value: 'OTROS' }
];

const Vivienda = [
    { value: '0' },
    { value: '1'},
    { value: '2' },
    { value: '3' },
];

const Bano = [
    { value: 'FOSA' },
    { value: '1'},
    { value: '2' },
    { value: '3' },
];

const Dormitorios = [
    { value: '0' },
    { value: '1'},
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5' }
];

const TrabajadoraS = [
    { value: 'DANIELA' },
    { value: 'ELIZABETH'},
    { value: 'GABRIELA' },
    { value: 'ROSARIO' },
    { value: 'OTRO' }
];

const Apoyos = [
    { value: 'ORIENTACION' },
    { value: 'DESPENSA'},
    { value: 'ALIMENTO' },
    { value: 'LECHE' },
    { value: 'PAÑALES' },
    { value: 'MEDICAMENTO' },
    { value: 'ESTUDIOS MEDICOS' },
    { value: 'IMPLEMENTOS MEDICOS' },
    { value: 'T.M.OFTALMOLOGICO' },
    { value: 'T.M. ONCOLOGICO' },
    { value: 'T.M. DIALISIS' },
    { value: 'T.M. HEMODIALISIS' },
    { value: 'T.M. OXIGENO' },
    { value: 'AUDITIVO' },
    { value: 'PROTESIS EXTERNAS' },
    { value: 'SILLAS DE RUEDAS' },
    { value: 'ANDADERAS' },
    { value: 'MULETAS' },
    { value: 'CAMA DE HOSPITAL' },
    { value: 'COLCHON ORTOPEDICO' },
    { value: 'AUXILIAR DE BAÑO' },
    { value: 'ASPIRADOR DE SECRECIONES' },
    { value: 'BASTON' },
    { value: 'CORSET' },
    { value: 'I. ORTOPEDICO' },
    { value: 'ENSERES DOMESTICOS' },
    { value: 'RENTA' },
    { value: 'TRANSPORTE' },
    { value: 'PEQUEÑO COMERCIO' },
    { value: 'DOCUMENTOS DE EMPLEO' },
    { value: 'FUNERAL' },
    { value: 'ROPA' },
    { value: 'ZAPATOS O TENIS' },
    { value: 'KIT DE LIMPIEZA' },
    { value: 'COBIJAS' },
    { value: 'CENAS NAVIDEÑAS' },
    { value: 'SEGUIMIENTO' },
    { value: 'RENOVO CANALIZACION' },
    { value: 'DERIVACION' },
    { value: 'OTROS' }
];

const Procedencia = [
    { value: 'CENTRO DE JUSTICIA PARA LA MUJER' },
    { value: 'CENTRO MEDICO DE OCCIDENTE' },
    { value: 'CRUZ ROJA' },
    { value: 'CRUZ VERDE' },
    { value: 'DIF JALISCO' },
    { value: 'FM4' },
    { value: 'FUNDACION OFTALMOLOGICA DE OCCIDENTE' },
    { value: 'GRUPO PARROQUIAL' },
    { value: 'HOSPITAL CIVIL NUEVO' },
    { value: 'HOSPITAL CIVIL VIEJO' },
    { value: 'HOSPITAL GENERAL DE OCCIDENTE' },
    { value: 'INICIATIVA PROPIA' },
    { value: 'INSTITUTO JALISCIENCE DE CANCEROLOGIA' },
    { value: 'PRO VISTA' },
    { value: 'SALME' },
    { value: 'TELETON' },
    { value: 'UNA OPORTUNIDAD DE VIDA' },
    { value: 'OTROS' },
    { value: 'DIF ACATIC' },
    { value: 'DIF ACATLÁN DE JUÁREZ' },
    { value: 'DIF AHUALULCO DE MERCADO' },
    { value: 'DIF AMACUECA' },
    { value: 'DIF AMATITÁN' },
    { value: 'DIF AMECA' },
    { value: 'DIF ARANDAS' },
    { value: 'DIF ATEMAJAC DE BRIZUELA' },
    { value: 'DIF ATENGO' },
    { value: 'DIF ATENGUILLO' },
    { value: 'DIF ATOTONILCO EL ALTO' },
    { value: 'DIF ATOYAC' },
    { value: 'DIF AUTLÁN DE NAVARRO' },
    { value: 'DIF AYOTLÁN' },
    { value: 'DIF AYUTLA' },
    { value: 'DIF BOLAÑOS' },
    { value: 'DIF CABO CORRIENTES' },
    { value: 'DIF CAÑADAS DE OBREGÓN' },
    { value: 'DIF CASIMIRO CASTILLO' },
    { value: 'DIF CHAPALA' },
    { value: 'DIF CHIMALTITÁN' },
    { value: 'DIF CHIQUILISTLÁN' },
    { value: 'DIF CIHUATLÁN' },
    { value: 'DIF COCULA' },
    { value: 'DIF COLOTLÁN' },
    { value: 'DIF CONCEPCIÓN DE BUENOS AIRES' },
    { value: 'DIF CUAUTITLÁN DE GARCÍA BARRAGÁN' },
    { value: 'DIF CUAUTLA' },
    { value: 'DIF CUQUÍO' },
    { value: 'DIF DEGOLLADO' },
    { value: 'DIF EJUTLA' },
    { value: 'DIF EL ARENAL' },
    { value: 'DIF EL GRULLO' },
    { value: 'DIF EL LIMÓN' },
    { value: 'DIF EL SALTO' },
    { value: 'DIF ENCARNACIÓN DE DÍAZ' },
    { value: 'DIF ETZATLÁN' },
    { value: 'DIF GÓMEZ FARÍAS' },
    { value: 'DIF GUACHINANGO' },
    { value: 'DIF GUADALAJARA' },
    { value: 'DIF HOSTOTIPAQUILLO' },
    { value: 'DIF HUEJÚCAR' },
    { value: 'DIF HUEJUQUILLA EL ALTO' },
    { value: 'DIF IXTLAHUACÁN DE LOS MEMBRILLOS' },
    { value: 'DIF IXTLAHUACÁN DEL RÍO' },
    { value: 'DIF JALOSTOTITLÁN' },
    { value: 'DIF JAMAY' },
    { value: 'DIF JESÚS MARÍA' },
    { value: 'DIF JILOTLÁN DE LOS DOLORES' },
    { value: 'DIF JOCOTEPEC' },
    { value: 'DIF JUANACATLÁN' },
    { value: 'DIF JUCHITLÁN' },
    { value: 'DIF LA BARCA' },
    { value: 'DIF LA HUERTA' },
    { value: 'DIF LA MANZANILLA DE LA PAZ' },
    { value: 'DIF LAGOS DE MORENO' },
    { value: 'DIF MAGDALENA' },
    { value: 'DIF MASCOTA' },
    { value: 'DIF MAZAMITLA' },
    { value: 'DIF MEXTICACÁN' },
    { value: 'DIF MEZQUITIC' },
    { value: 'DIF MIXTLÁN' },
    { value: 'DIF OCOTLÁN' },
    { value: 'DIF OJUELOS DE JALISCO' },
    { value: 'DIF PIHUAMO' },
    { value: 'DIF PONCITLÁN' },
    { value: 'DIF PUERTO VALLARTA' },
    { value: 'DIF QUITUPAN' },
    { value: 'DIF SAN CRISTÓBAL DE LA BARRANCA' },
    { value: 'DIF SAN DIEGO DE ALEJANDRÍA' },
    { value: 'DIF SAN GABRIEL' },
    { value: 'DIF SAN IGNACIO CERRO GORDO' },
    { value: 'DIF SAN JUAN DE LOS LAGOS' },
    { value: 'DIF SAN JUANITO DE ESCOBEDO' },
    { value: 'DIF SAN JULIÁN' },
    { value: 'DIF SAN MARCOS' },
    { value: 'DIF SAN MARTÍN DE BOLAÑOS' },
    { value: 'DIF SAN MARTÍN HIDALGO' },
    { value: 'DIF SAN MIGUEL EL ALTO' },
    { value: 'DIF SAN SEBASTIÁN DEL OESTE' },
    { value: 'DIF SANTA MARÍA DE LOS ÁNGELES' },
    { value: 'DIF SANTA MARÍA DEL ORO' },
    { value: 'DIF SAYULA' },
    { value: 'DIF TALA' },
    { value: 'DIF TALPA DE ALLENDE' },
    { value: 'DIF TAMAZULA DE GORDIANO' },
    { value: 'DIF TAPALPA' },
    { value: 'DIF TECALITLÁN' },
    { value: 'DIF TECHALUTA DE MONTENEGRO' },
    { value: 'DIF TECOLOTLÁN' },
    { value: 'DIF TENAMAXTLÁN' },
    { value: 'DIF TEOCALTICHE' },
    { value: 'DIF TEOCUITATLÁN DE CORONA' },
    { value: 'DIF TEPATITLÁN DE MORELOS' },
    { value: 'DIF TEQUILA' },
    { value: 'DIF TEUCHITLÁN' },
    { value: 'DIF TIZAPÁN EL ALTO' },
    { value: 'DIF TLAJOMULCO DE ZÚÑIGA' },
    { value: 'DIF TLAQUEPAQUE' },
    { value: 'DIF TOLIMÁN' },
    { value: 'DIF TOMATLÁN' },
    { value: 'DIF TONALÁ' },
    { value: 'DIF TONAYA' },
    { value: 'DIF TONILA' },
    { value: 'DIF TOTATICHE' },
    { value: 'DIF TOTOTLÁN' },
    { value: 'DIF TUXCACUESCO' },
    { value: 'DIF TUXCUECA' },
    { value: 'DIF TUXPAN' },
    { value: 'DIF UNIÓN DE SAN ANTONIO' },
    { value: 'DIF UNIÓN DE TULA' },
    { value: 'DIF VALLE DE GUADALUPE' },
    { value: 'DIF VALLE DE JUÁREZ' },
    { value: 'DIF VILLA CORONA' },
    { value: 'DIF VILLA GUERRERO' },
    { value: 'DIF VILLA HIDALGO' },
    { value: 'DIF VILLA PURIFICACIÓN' },
    { value: 'DIF YAHUALICA DE GONZÁLEZ GALLO' },
    { value: 'DIF ZACOALCO DE TORRES' },
    { value: 'DIF ZAPOPAN' },
    { value: 'DIF ZAPOTILTIC' },
    { value: 'DIF ZAPOTITLÁN DE VADILLO' },
    { value: 'DIF ZAPOTLÁN DEL REY' },
    { value: 'DIF ZAPOTLÁN EL GRANDE' },
    { value: 'DIF ZAPOTLANEJO' }
];

const Excel = [[
    "CONSECUTIVO", "FECHA", "NO. CASO", "NOMBRE", "DOMICILIO", "COLONIA", "MUNICIPIO", "ESTADO", "EDAD", "SEXO",
    "CLASIFICACION", "PARROQUIA", "DECANATO", "VICARIA", "ORIENTACION", "DESPENSA", "ALIMENTO", "LECHE", 
    "PAÑALES", "MEDICAMENTO", "ESTUDIOS MEDICOS", "IMPLEMENTOS MEDICOS", "T.M.OFTALMOLOGICO", "T.M. ONCOLOGICO", 
    "T.M. DIALISIS", "T.M. HEMODIALISIS", "T.M. OXIGENO", "AUDITIVO", "PROTESIS EXTERNAS", "SILLAS DE RUEDAS", 
    "ANDADERAS", "MULETAS", "CAMA DE HOSPITAL", "COLCHON ORTOPEDICO", "AUXILIAR DE BAÑO", "ASPIRADOR DE SECRECIONES", 
    "BASTON", "CORSET", "I. ORTOPEDICO", "ENSERES DOMESTICOS", "RENTA", "TRANSPORTE", "PEQUEÑO COMERCIO", 
    "DOCUMENTOS DE EMPLEO", "FUNERAL", "ROPA", "ZAPATOS O TENIS", "KIT DE LIMPIEZA", "COBIJAS", "CENAS NAVIDEÑAS", 
    "SEGUIMIENTO", "RENOVO CANALIZACION", "DERIVACION", "OTROS", "CANTIDAD AUTORIZADA", "DONATIVO HOSPITAL", 
    "FONDO ARZOBISPADO", "FONDO CABILDO", "FONDO OLGA", "DONANTE", "APORTACIÓN BENEFICIADO", "PROVEEDOR", 
    "PROCEDENCIA", "SERVICIOS", "CANTIDAD DE HEMODIALISIS", "GASTO DIARIO", "LIC. CANELA", "MES DE APADRINAMIENTO", 
    "AÑO DE APADRINAMIENTO", "TRABAJADORA SOCIAL"
]];

const Frecuencia = [
    { value: '1' },
    { value: '2'},
    { value: '3' },
    { value: '4' },
    { value: '5' },
    { value: '6+' }
];

const Parentesco = [
    { value: 'PADRE' },
    { value: 'MADRE'},
    { value: 'HIJO' },
    { value: 'HIJA' },
    { value: 'ABUELO' },
    { value: 'ABUELA' },
    { value: 'TIO' },
    { value: 'TIA' },
    { value: 'SOBRINO' },
    { value: 'SOBRINA' },
    { value: 'ESPOSO' },
    { value: 'ESPOSA' },
    { value: 'HERMANO' },
    { value: 'HERMANA' },
    { value: 'PRIMA' },
    { value: 'PRIMA' },
    { value: 'OTROS' },
    { value: 'NINGUNO' }
];

const Escolaridad = [
    { value: 'PRIMARIA' },
    { value: 'SECUNDARIA'},
    { value: 'PREPARATORIA' },
    { value: 'LICENCIATURA' },
    { value: 'NINGUNA' },
    { value: 'OTROS' }
]; 

const Estados = [
    { value: 'JALISCO' },
    { value: 'AGUASCALIENTES' },
    { value: 'BAJA CALIFORNIA' },
    { value: 'BAJA CALIFORNIA SUR' },
    { value: 'CAMPECHE' },
    { value: 'CHIAPAS' },
    { value: 'CHIHUAHUA' },
    { value: 'CIUDAD DE MÉXICO' },
    { value: 'COAHUILA' },
    { value: 'COLIMA' },
    { value: 'DURANGO' },
    { value: 'GUANAJUATO' },
    { value: 'GUERRERO' },
    { value: 'HIDALGO' },
    { value: 'MÉXICO' },
    { value: 'MICHOACÁN' },
    { value: 'MORELOS' },
    { value: 'NAYARIT' },
    { value: 'NUEVO LEÓN' },
    { value: 'OAXACA' },
    { value: 'PUEBLA' },
    { value: 'QUERÉTARO' },
    { value: 'QUINTANA ROO' },
    { value: 'SAN LUIS POTOSÍ' },
    { value: 'SINALOA' },
    { value: 'SONORA' },
    { value: 'TABASCO' },
    { value: 'TAMAULIPAS' },
    { value: 'TLAXCALA' },
    { value: 'VERACRUZ' },
    { value: 'YUCATÁN' },
    { value: 'ZACATECAS' }
];

const Decanatos = [
{ value: 'AHUALULCO' },
{ value: 'AMECA' },
{ value: 'ANALCO' },
{ value: 'ATEMAJAC' },
{ value: 'CHAPALA' },
{ value: 'COCULA' },
{ value: 'DULCE NOMBRE DE JESÚS' },
{ value: 'EL TEÚL' },
{ value: 'GETSEMANÍ DE LA CRUZ' },
{ value: 'GUADALUPE CHAPALITA' },
{ value: 'HUENTITÁN' },
{ value: 'IXTLAHUACÁN DEL RÍO' },
{ value: 'JESUCRISTO OBRERO' },
{ value: 'JESUCRISTO REY DEL UNIVERSO' },
{ value: 'JOCOTEPEC' },
{ value: 'JUCHIPILA' },
{ value: 'LA BARCA' },
{ value: 'LA LUZ' },
{ value: 'LA PAZ' },
{ value: 'LA SANTA CRUZ' },
{ value: 'LA VISITACIÓN' },
{ value: 'LOURDES' },
{ value: 'MAGDALENA' },
{ value: 'MIRAVALLE' },
{ value: 'NOCHISTLÁN' },
{ value: 'NUESTRA SEÑORA DEL REFUGIO' },
{ value: 'OCOTLÁN' },
{ value: 'POLANCO' },
{ value: 'PONCITLÁN' },
{ value: 'SAGRARIO METROPOLITANO' },
{ value: 'SAN ANDRÉS' },
{ value: 'SAN FELIPE' },
{ value: 'SAN ILDEFONSO' },
{ value: 'SAN ISIDRO' },
{ value: 'SAN JOSÉ DEL CASTILLO' },
{ value: 'SAN JUAN BAUTISTA' },
{ value: 'SAN PEDRITO' },
{ value: 'SAN PEDRO' },
{ value: 'SAN PIO DE PIETRELCINA' },
{ value: 'SANTA ANA TEPETITLÁN' },
{ value: 'SANTA CECILIA' },
{ value: 'SANTA ROSA DE LIMA' },
{ value: 'TALPITA' },
{ value: 'TEMASTIÁN' },
{ value: 'TESISTÁN' },
{ value: 'TETLÁN' },
{ value: 'TLAJOMULCO' },
{ value: 'TOLUQUILLA' },
{ value: 'TONALÁ' },
{ value: 'ZALATITÁN' },
{ value: 'ZAPOPAN' },
{ value: 'ZAPOPAN ESTADIO' },
{ value: 'ZAPOTLANEJO' },
{ value: 'OTROS/FORANEO' }
];

export { 
    ECivil, 
    Empleo, 
    Alimentacion, 
    CondicionVivienda, 
    Zona,
    Menaje, 
    AtencionMedica,
    Pronostico,
    Vivienda,
    Bano,
    Dormitorios,
    TrabajadoraS,
    Piso,
    Techo,
    Muro,
    Apoyos,
    Procedencia,
    Excel,
    Sexo,
    Frecuencia,
    Escolaridad,
    Parentesco,
    Estados,
    Decanatos
};