import React, { Component } from 'react';
import {
  AppRegistry,    // Registers the app
  StatusBar,      // Allows to hide the satatus bar
  AsyncStorage,
  Alert,
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
import { HeaderBackButton } from 'react-navigation';
const iconStyles = {
  size: 30,
  color: '#fff',
  paddingLeft: 50,
};
export default class ConditionsGenerales extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Conditions Générales",
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 15 }}
        >
          <Icon name="ios-arrow-dropleft-circle" {...iconStyles} />
        </TouchableOpacity>
      ),
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignSelf: 'center'
      },
      headerStyle: {
        backgroundColor: 'rgba(230, 0, 126, 1)',
        elevation: 0,
        shadowOpacity: 0
        //height: 80,

      }
    }
  }
  constructor(props) {
    super(props);

  }
  async componentWillMount() {

  }
  componentDidMount() {
    StatusBar.setHidden(true);

  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>

        <View style={styles.outer}>
          <Text style={styles.inside}>
            CONDITIONS GENERALES D’UTILISATION DE L’APPLICATION ICE 2.0

    L’objet des présentes Conditions Générales d’utilisation (ci-après les « Conditions Générales ») est de définir les conditions générales dans lesquelles Vous (ci-après l’« Utilisateur », « Vous », « Votre », « Vos ») pouvez utiliser l’Application SnapPress, éditée par SnapPress (ci-après «SnapPress», «Nous», «Notre», « Nos »).
    En accédant, téléchargeant, installant et/ou utilisant SnapPress, Vous acceptez de vous soumettre à l’ensemble des dispositions contractuelles applicables. Par conséquent, Nous Vous demandons de lire attentivement les présentes Conditions Générales avant tout accès et utilisation de Nos services et ce, de quelque manière que ce soit.
    Si Vous êtes mineur, Nous Vous rappelons que Vous devez obligatoirement avoir obtenu l’accord de Vos parents ou de Votre (vos) représentant(s) légal (légaux) avant tout téléchargement, installation et/ou utilisation de SnapPress.
    Si Vous refusez tout ou partie de l’une quelconque des obligations ou conditions présentes dans ces Conditions Générales, veuillez ne pas poursuivre l’utilisation de l’Application SnapPress.
    À tout moment, Vous pouvez accéder aux présentes Conditions Générales sur l’Application (via les pages « Menu » ou « Aide » contenues dans l’Application), et stocker ces dernières sur Votre mobile ou tablette.
    DEFINITIONS

    Chaque terme listé ci-dessous commençant par une lettre majuscule a la signification qui lui est attribuée par le présent article.
    « SnapPress » ou « Application » désigne l’application (pour mobiles et tablettes) disponible gratuitement sur l’« App Store » ou le « Play Store », pour tous les systèmes d’exploitation de la version 4.4 KitKat pour les Android et de la version iOS8 pour les iOS.
    « Document enrichi » désigne un document imprimé qui peut être numérisé par l’Application et qui peut déclencher des images de Réalité Augmentée et pouvant faire référence à un Service Digital.
    « Numérisation » ou « Numériser » désigne la capture du Document Enrichi par l’Application via l’appareil photo de Votre appareil.
    « Pictogramme » désigne l’image figurant sur le Document Enrichi et indiquant à l’Utilisateur que l’image peut être numérisée en utilisant l’Application.
    « Service Digital » désigne le service accessible via l’Application, et notamment, le service par lequel Vous pouvez vous référer à un lien URL existant, passer un appel à un numéro de téléphone, envoyer un mail à une adresse e-mail spécifique, visualiser une image en Réalité Augmentée etc.
    « Réalité Augmentée » désigne la technologie qui permet d’afficher une image virtuelle en superposant cette dernière à un objet physique et ce, à l’aide d’un mobile ou d’une tablette.
    MODIFICATIONS

    Nous pouvons modifier, à tout moment, tout ou partie de l’Application et/ou modifier les présentes Conditions Générales. La version la plus récente des Conditions Générales sera celle disponible avec la dernière mise à jour de l’Application.
    ACCES ET UTILISATION DE L’APPLICATION

    Afin d’accéder et utiliser l’Application, l’Utilisateur doit télécharger et installer l’Application sur un appareil mobile conforme aux prérequis techniques de SnapPress.
    L’Application est fournie sans contrepartie financière, à l'exclusion des frais d'abonnement mobile et/ou internet que Vous devez payer à Votre opérateur.
    L’accès et l’utilisation ne demande aucune création de compte et permet à l’Utilisateur de Numériser n’importe quel Document Enrichi, lequel pouvant être identifiable par la présence d’un Pictogramme.
    L’Utilisateur sera ensuite redirigé vers un Service Digital, telles que notamment des images de Réalité Augmentée.
    Ces images de Réalité Augmentée proposent une variété d’actions que l’Utilisateur peut sélectionner afin d’accéder à d’autres Services Digitaux, notamment, l’accès à un lien URL particulier, l’ouverture d’une vidéo, l’appel d’un numéro de téléphone, l’envoi d’un mail à une adresse e-mail spécifique etc.
    DISPONIBILITE

    L’Application et les Services Digitaux sont fournis et fonctionnent au moyen d’Internet et/ou de réseaux mobiles qui sont hors du contrôle de SnapPress. SnapPress et ses sous-traitants n’acceptent aucune responsabilité pour l’indisponibilité de l’Application et des Services Digitaux ou toute difficulté ou incapacité à télécharger ou à accéder au contenu ou toute défaillance du système de communication qui pourrait rendre l’Application et les Services Digitaux indisponibles.
    UTILISATION DE L’APPLICATION

    De manière générale, l’Utilisateur s’engage à ne pas se livrer à des actes, de quelque nature que ce soit, qui auraient pour effet de porter atteinte à l’ordre public, à Nos droits ou aux droits de tiers ou plus généralement, à être conforme aux dispositions légales, réglementaires ou aux usages en vigueur.
    En particulier, l’Utilisateur s’engage notamment à respecter scrupuleusement les règles suivantes :
    Utiliser l'Application uniquement à des fins personnelles et non commerciales ;
    Utiliser l’Application et les Services Digitaux de manière loyale et conformément à leur finalité et aux conditions d’utilisation ;
    S’assurer que l’utilisation de l’Application n’enfreint, en aucune sorte, les droits de SnapPress ;
    S’assurer que l'utilisation de l’Application ne constitue ni un acte de contrefaçon, ni de concurrence déloyale ou parasitaire ;
    S’engager à ne pas porter atteinte ou essayer de porter atteinte à l’intégrité ou à la sécurité de l’infrastructure informatique à la base du fonctionnement de l’Application et/ou des Services Digitaux. A ce titre, l’Utilisateur s’engage, notamment à respecter scrupuleusement les règles suivantes :
    ne pas diffuser de données informatiques qui auraient pour but de perturber le fonctionnement normal de l’Application ou des Services Digitaux (tels que des robots informatiques, des virus, etc.) ;
    ne pas télécharger, afficher, transmettre de quelque manière que ce soit tout contenu comprenant des virus informatiques, vers, chevaux de Troie, codes ou scripts susceptibles de nuire à l’intégrité ou à la confidentialité des systèmes et de données ;
    ne pas extraire de données figurant dans l’Application et/ou les Services Digitaux, tant au niveau des données que Nous stockons nous-mêmes ou par l’intermédiaire de Nos sous-traitants ou autres prestataires.
    PROPRIETE INTELLECTUELLE

    Titularité sur l’Application et les Services Digitaux. L’Application et les Services Digitaux sont Notre propriété ou font l’objet d’une licence de la part de tiers à Notre profit. Nous (ou Nos partenaires) sommes (sont) les titulaires de tous les droits de propriété intellectuelle tant sur la structure que sur le contenu de l’Application et des Services Digitaux ou avons (ont) acquis régulièrement les droits permettant leur exploitation. Rien dans les présentes ne Vous confère le droit d’utiliser les marques, logos, noms de domaines et autre signe distinctif.
    Toute utilisation non autorisée de l’Application et/ou des Services Digitaux pourra donner lieu à des poursuites judiciaires civiles et/ou pénales et au paiement de dommages et intérêts.
    License d’utilisation de l’Application. L’Application peut être utilisée par Vous conformément aux stipulations des présentes Conditions Générales.
    La version mobile de l’Application peut être téléchargée à partir des plateformes de Nos partenaires (ex. Apple App Store, Google Play) et installée sur Votre téléphone mobile et/ou tablette. Nous Vous accordons une licence personnelle, non transférable, et non-exclusive de l’Application. Cette licence donne à l’Utilisateur le droit lui permettant d’accéder à l’Application et le droit de l’utiliser dans le cadre et les finalités prévues aux présentes Conditions Générales. Les droits susvisés ne sauraient en aucun cas être utilisés à d’autres fins. En particulier, l’accès au code source de l'Application ou aux composants logiciels, toute reproduction, représentation, adaptation, modification, traduction, transformation, diffusion, intégration dans un site Internet, exploitation commerciale ou non, et/ou réutilisation de quelque manière que ce soit de tout ou partie de l'Application sans l’autorisation expresse et écrite de SnapPress est strictement interdite. En dehors des cas prévus par la loi, il est interdit de procéder à l’ingénierie à rebours, au désassemblage ou à la décompilation de l'Application ou d’autoriser quiconque à y procéder.
    L’utilisation de tout instrument automatisé ou informatisé non autorisé pour accéder, obtenir, reproduire, télécharger, extraire, utiliser l'Application, les Services Digitaux et leur contenu est strictement interdite.
    RESPONSABILITE

    Responsabilité de SnapPress. Nous ne garantissons en aucune façon l’exactitude, la qualité, la licéité ou l’adéquation à un usage particulier de l'Application et des Services Digitaux.
    Du fait de la nature particulière du réseau internet, Nous pouvons à tout moment interrompre ou restreindre l’accès de l'Application et des Services Digitaux en raison d’évènements qui sont hors de Notre contrôle.
    Si Nous devions être tenus pour responsable d’un dommage non prévu au présent article, Notre responsabilité sera limitée aux dommages certains, réels et directs.
    En aucun cas SnapPress, ses dirigeants, ses employés et de manière générale, ses représentants et partenaires, ne sauraient être tenus pour responsables des dommages indirects résultant de l’utilisation de l’Application et des Services Digitaux, et notamment du manque à gagner, de la perte de profit ou des dommages découlant de la perte de données causée par l’impossibilité d’utiliser l’Application.
    Responsabilité de l’Utilisateur. L’Utilisateur est responsable de la sécurité et de l’intégrité de son matériel et de ses logiciels lorsqu’il accède à l’Application. L’Utilisateur est seul responsable de l’usage qu’il fait ou qu’il entend faire de l’Application et de toute conséquence qui en découlerait.
    ACCES AUX SITES ET SERVICES TIERS

    Les Services Digitaux peuvent contenir des liens hypertextes, affichés de façon manuelle ou automatique, susceptibles de renvoyer l’Utilisateur vers des sites Internet édités et gérés par des tiers. Nous informons l’Utilisateur que Nous n’exerçons aucun contrôle ni surveillance sur les sites tiers, applications et/ou contenu. Nous ne sommes pas responsables du contenu ou des services mis à disposition sur ces sites, des problèmes de sécurité ou d’intégrité des données, matériels et logiciels ainsi que de toute conséquence ou dommage qui pourrait résulter du fait de l’utilisation desdits sites tiers.
    CONFIDENTIALITE ET DONNEES PERSONNELLES

    Vos données. Dans le cadre de Votre utilisation de l’Application et des Services Digitaux Nous pouvons être amené à collecter et traiter les informations suivantes :
    Les informations techniques concernant l’appareil mobile que Vous utilisez (tablette, téléphone mobile) tels que notamment l'identifiant unique de Votre appareil, le modèle et la version de Votre appareil, le système d'exploitation, la version de l’appareil photo ;
    Les données relatives à la version de l’Application que Vous utilisez ;
    Les données relatives à Votre utilisation de l’Application tels que, les données liées à l’image utilisée pour la reconnaissance d’images, les Documents Enrichis que Vous avez numérisés, le nombre de Numérisations, Vos interactions, notamment avec des sites tiers via les Services Digitaux ;
    Les données en lien avec les paramètres de l’Application (préférences linguistiques, format de visualisation, etc.).
    Sachez que l’Application se base sur la Numérisation de Documents Enrichies. Si Vous choisissez d’utiliser l’Application, Vous autorisez l’Application à accéder à l’appareil photo de Votre matériel.
    Vous acceptez également que les données réseau de l'Application, telles que l'adresse IP, utilisent la géolocalisation de Votre système d'exploitation mobile ou de Votre navigateur Web pour déterminer Votre position. Notez que Votre nom de famille, Votre prénom, Votre adresse e-mail et Votre numéro de téléphone ne sont stockés que sur Votre appareil et ne sont ni collectés ni traités par SnapPress.
    Utilisation de Vos données. L'objectif principal du traitement de Vos données personnelles est de Vous permettre d'utiliser l'Application et les Services Digitaux, et notamment de :
    Gérer les Documents Enrichis que Vous avez numérisés et d’accéder aux Services Digitaux ;
    Effectuer des analyses et des statistiques sur l'utilisation de l'Application (nombre de Numérisations, nombre de clics, nombre d'utilisateurs, etc.) ;
    Prévenir toute activité interdite ou illégale ;
    Corriger les problèmes et améliorer l’Application.
    Vos données de localisation sont utilisées uniquement pour déterminer Votre pays et Votre ville et ce, pour des raisons techniques et de sécurité (en particulier afin de déterminer les serveurs devant être utilisés pour Vous permettre d'accéder aux Services Digitaux).
    Nous pouvons être amenés à fournir Vos données personnelles à des tiers travaillant pour Nous ou pour Nos partenaires (la liste des partenaires peut être obtenue en nous écrivant à l'adresse mentionnée dans la section « Comment Nous contacter ? » ci-dessous).
    Vos données personnelles peuvent également être fournies à d’autres sociétés affiliées, sous-traitants en charge de la gestion, de l’hébergement, de la maintenance et de l’administration de l’Application et des transactions connexes.
    La fourniture de données est réalisée sous certaines conditions et garanties permettant le respect de cette politique et des règles applicables relatives à la protection des données personnelles, notamment, les règles concernant la sous-traitance des données personnelles.
    Si SnapPress fusionne, est acquise ou est vendue à une autre société, en tout ou partie, Notre activité prendra fin, Nous fournirons Vos données personnelles à ladite société et ce, même si cette dernière est établie en dehors de l’Union Européenne. En outre, Nous pouvons être tenu de divulguer Vos données personnelles afin de garantir le respect d'une obligation légale ou réglementaire, d'une décision judiciaire ou, le cas échéant, de défendre ou d'exercer un droit devant une juridiction tant en France qu’à l'étranger.
    Sécurité. SnapPress prend toutes les précautions organisationnelles et techniques nécessaires afin de protéger Vos données personnelles et ce, en conformité avec les obligations et les exceptions applicables en vertu des lois en vigueur afin de protéger les données contre toute manipulation, perte, destruction, divulgation accidentelle ou intentionnelle ou tout accès non autorisé sur Vos données.
    DUREE ET RESILIATION

    Vous pouvez résilier Votre contrat avec SnapPress à tout moment ainsi que Votre utilisation de l'Application en supprimant ladite Application de Votre appareil mobile.
    STIPULATIONS GENERALES

    Renonciation. Le fait pour l’une ou l’autre des parties de ne pas se prévaloir d’un droit ou d’une stipulation des Conditions Générales ne doit pas être considéré comme une renonciation à ce droit ou à cette disposition.
    Divisibilité. Dans le cas où une stipulation des Conditions Générales serait jugée invalide ou inapplicable, cette stipulation sera limitée ou supprimée dans la stricte mesure nécessaire, et les dispositions restantes des Conditions Générales resteront pleinement en vigueur.
    Intégralité. Ces Conditions Générales constituent l’intégralité de l’accord conclu entre SnapPress et Vous concernant l’utilisation de l’Application et des Services Digitaux.
    Langue. En cas de contentieux sur les présentes Conditions Générales, la version française du document prévaudra pour l’interprétation desdites clauses.
    LOI APPLICABLE ET COMPETENCE JURIDICTIONNELLE

    Les présentes Conditions Générales sont soumises à la loi française.
    Toute réclamation, poursuite judiciaire ou litige en relation avec l’Application sera porté exclusivement devant les juridictions françaises.
    COMMENT NOUS CONTACTER ?

    Vous pouvez nous contacter via le formulaire de contact de l’Application pour toute question relative aux présentes Conditions Générales et/ou l'utilisation de Vos données ou pour exercer Votre droit d'accès, de modification ou de suppression de Vos données.
        </Text>
        </View>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  inside: {
    padding: 5
  },
  arView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 20
  },
  buttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  }
});


/*{renderIf(this.state.skipIntro,
  <Text style={styles.header}>LOVE</Text>)
}
*/