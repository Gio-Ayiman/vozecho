
function About() {

    return (
        <div className="container flex flex-col justify-center px-4 mx-auto md:p-8 p-6 ">
            <h1 className="text-primary text-center text-lg md:text-xl">Conditions d'utilisations de l'Application VozEcho</h1>
            <div className="text-primary md:pt-8 md:px-10 lg:px-16 max-w-7xl mx-auto text-lg columns-xs gap-x-12 md:gap-x-14 lg:columns-2">
                <div className="text-justify space-y-4">
                    <h3 className="text-primary font-medium">
                        Introduction
                    </h3>
                    <div className="text-sm lg:text-base text-gray-700 leading-relaxed">
                        En utilisant l'application VozEcho, vous acceptez les présentes conditions d'utilisation. Ces
                        conditions constituent un accord juridique entre vous et BakoAI, une entreprise établie aux
                        feux tricolores de Glass, Libreville - Gabon.
                    </div>
                </div>

                <div className="text-justify py-5 space-y-4">
                    <h3 className="text-primary font-medium">
                        Utilisation de l'application
                    </h3>
                    <div className="text-sm lg:text-base text-gray-700 leading-relaxed space-y-3">
                        Vous ne pouvez utiliser l'Application qu'à des fins légales. Vous ne pouvez pas utiliser
                        l'Application pour enregistrer, partager ou distribuer des contenus illégaux, offensants,
                        diffamatoires, nuisibles, obscènes, incitant à la haine ou discriminatoires
                    </div>
                </div>

                <div className="text-justify py-5 space-y-4">
                    <h3 className="text-primary font-medium">
                        Enregistrements Vocaux et Partage
                    </h3>
                    <div className="text-sm lg:text-base text-gray-700 leading-relaxed space-y-3">
                        Vous êtes le seul responsable des enregistrements vocaux que vous créez et partagez à travers
                        l'Application. En utilisant l'Application, vous garantissez que vous avez tous les droits
                        nécessaires pour enregistrer et partager vos enregistrements vocaux. Vous accordez à
                        VozEcho une licence non exclusive pour utiliser, copier, distribuer et rendre accessible vos
                        enregistrements vocaux dans le cadre de la fourniture des services de l'Application.
                    </div>
                </div>

                <div className="text-justify space-y-4">
                    <h3 className="text-primary font-medium">  
                        Respect de la vie privée
                    </h3>
                    <div className="text-sm lg:text-base text-gray-700 leading-relaxed">
                        VozEcho respecte votre vie privée. Toutes les informations personnelles que vous nous
                        fournissez lors de l'utilisation de l'Application sont traitées conformément à notre politique de
                        confidentialité. Les données sont stockées et accessible pendant 10 ans.
                    </div>
                </div>

                <div className="text-justify py-5 space-y-4">
                    <h3 className="text-primary font-medium">
                        Exclusion de garantie
                    </h3>
                    <div className="text-sm lg:text-base text-gray-700 leading-relaxed space-y-3">
                        L'Application est fournie "en l'état" et "selon la disponibilité", sans aucune garantie de
                        quelque nature que ce soit, expresse ou implicite.
                    </div>
                </div>

                <div className="text-justify py-5 space-y-4">
                    <h3 className="text-primary font-medium">
                        Limitation de responsabilité
                    </h3>
                    <div className="text-sm lg:text-base text-gray-700 leading-relaxed">
                        VozEcho ne sera en aucun cas responsable de tout dommage, direct ou indirect, résultant de
                        votre utilisation ou de votre incapacité à utiliser l'Application.
                    </div>
                </div>

                <div className="text-justify py-5 space-y-4">
                    <h3 className="text-primary font-medium">
                        Modification des Conditions
                    </h3>
                    <div className="text-sm lg:text-base text-gray-700 leading-relaxed space-y-3">
                        VozEcho se réserve le droit de modifier les présentes Conditions à tout moment. Les
                        modifications entreront en vigueur dès leur publication sur l'Application.
                    </div>
                </div>

                <div className="text-justify py-5 space-y-4">
                    <h3 className="text-primary font-medium">
                        Loi applicable et juridiction
                    </h3>
                    <div className="text-sm lg:text-base text-gray-700 leading-relaxed space-y-3">
                        Les présentes Conditions sont régies par les lois du Gabon. Tout litige découlant de ou en
                        relation avec ces Conditions sera soumis à la juridiction exclusive des tribunaux de Libreville.
                    </div>
                </div>

            </div>
            <div className="text-justify py-5 space-y-4">
                <h3 className="text-primary font-medium text-xl md:text-2xl">
                    Contact
                </h3>
                <div className="text-black text-sm">
                    <p className="">Si vous avez des questions sur les présentes Conditions, veuillez nous contacter : </p>
                    <p>BakoAI</p>
                    <p>Feux tricolores de Glass, Libreville - Gabon</p>
                    <a href="tel:+24177438600">+241 (0) 77 43 86 00</a> <br/>
                    <a type="mail" href="mailto:contact@bakoai.pro">contact@bakoai.pro</a>
                </div>
            </div>
        </div>
    )
}

export default About;