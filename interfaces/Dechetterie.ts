export interface Dechetterie {
      nom_de_la_decheterie: string;
      adresse_1: string;
      code_postal: string;
      commune: string;
      departement: string;
      dechets_non_dangereux?: string;
      dechets_dangereux?: string;
      dechets_inertes?: string;
      accueil_des_professionnels?: string;
      accueil_des_services_techniques?: string;
      zone_dediee_au_reemploi?: string;
      jours_d_ouverture_particuliers?: string;
      jours_d_ouverture_artisans?: string;
      tout_venant?: string;
      gravats?: string;
      dechets_dangereux0?: string;
      dechets_verts?: string;
      ferrailles?: string;
      bois?: string;
      pneus?: string;
      dechets_d_equipements_electriques_et_electroniques?: string;
      textiles?: string;
      cartons?: string;
      papiers_graphiques?: string;
      dechets_d_activites_de_soin_a_risques_infectieux?: string;
      amiante?: string;
      piles_et_accumulateurs_et_batteries?: string;
      huiles?: string;
      autres?: string;
      wgs84?: {
        lon: number;
        lat: number;
      };
    }
    