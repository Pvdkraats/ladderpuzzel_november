"use client";

export default function GameInfo() {
  return (
    <div className="w-full mx-auto mb-12 px-4 ">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
        Ladderpuzzel November - Draaien
      </h1>

      <div className="space-y-4 text-lg leading-relaxed text-gray-900">
        <p>
          In de cirkels moeten woorden van 6 letters worden ingevuld, met de klok
          mee (rechtsom) of tegen de klok in (linksom). Achter de beschrijvingen die
          hieronder staan, staat een R of een L, van linksom of rechtsom. Welk woord
          in welke cirkel moet en waar het woord begint en eindigt is aan u om uit te
          zoeken. Het middelste woord, dat u cadeau krijgt, vormt een goed
          uitgangspunt. Als alle cirkels goed zijn ingevuld, vormen de letters bij de
          nummers 1-25 achter elkaar gelezen van 1 tot 25 een uitdrukking.
        </p>

        <p>
          Twee extra aanwijzingen:<br />
          1. De cirkelsegmenten die elkaar raken hebben dezelfde letter.<br />
          2. De omschrijvingen staan zo dat de woorden die u daarbij moet vinden in
          alfabetische volgorde komen te staan.
        </p>
      </div>
    </div>
  );
}
