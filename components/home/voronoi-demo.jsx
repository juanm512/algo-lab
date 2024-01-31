export default function VoronoiDemo() {
  return (
    <svg viewBox="0 0 1600 900" class="group inset-0 aspect-video w-full">
      <SolutionAreas />
      <circle
        fill="#525252"
        r="10"
        cx="1143"
        cy="434"
        stroke="#525252"
        stroke-width="2.5"
        class="animate-fade-up transition-all duration-500 ease-in"
      ></circle>
      <circle
        fill="#525252"
        r="10"
        cx="310"
        cy="674"
        stroke="#545454"
        stroke-width="2"
        class="animate-fade-up transition-all duration-500 ease-in"
      ></circle>
      <circle
        fill="#525252"
        r="10"
        cx="1583"
        cy="578"
        stroke="#545454"
        stroke-width="2"
        class="animate-fade-up transition-all duration-500 ease-in"
      ></circle>
      <circle
        fill="#525252"
        r="10"
        cx="852"
        cy="334"
        stroke="#545454"
        stroke-width="2"
        class="animate-fade-up transition-all duration-500 ease-in"
      ></circle>
      <circle
        fill="#525252"
        r="10"
        cx="603"
        cy="197"
        stroke="#545454"
        stroke-width="2"
        class="animate-fade-up transition-all duration-500 ease-in"
      ></circle>
      <circle
        fill="#525252"
        r="10"
        cx="671"
        cy="431"
        stroke="#545454"
        stroke-width="2"
        class="animate-fade-up transition-all duration-500 ease-in"
      ></circle>
      <circle
        fill="#525252"
        r="10"
        cx="144"
        cy="453"
        stroke="#525252"
        stroke-width="2.5"
        class="animate-fade-up transition-all duration-500 ease-in"
      ></circle>
      <circle
        fill="#525252"
        r="10"
        cx="1138"
        cy="267"
        stroke="#545454"
        stroke-width="2"
        class="animate-fade-up transition-all duration-500 ease-in"
      ></circle>
      <circle
        fill="#525252"
        r="10"
        cx="1507"
        cy="340"
        stroke="#545454"
        stroke-width="2"
        class="animate-fade-up transition-all duration-500 ease-in"
      ></circle>
      <circle
        fill="#525252"
        r="10"
        cx="1317"
        cy="79"
        stroke="#545454"
        stroke-width="2"
        class="animate-fade-up transition-all duration-500 ease-in"
      ></circle>
    </svg>
  );
}

function SolutionAreas() {
  return (
    <g>
      <polyline
        className="transition-all ease-in hover:opacity-50"
        points=" 1314.230924940416,345.2984753011851, 1358.9368708411537,518.4151168742537, 1234.0545454545456,900, 904.0286016949152,900, 905.6086623351392,651.4037926047441, 1007.6451233964696,354.4776909162734"
        fill="#250a2f70"
      ></polyline>
      <polyline
        className="transition-all ease-in hover:opacity-50"
        points=" 406.93012346090137,428.34886654068055, 724.4127423822715,900, 0,900, 0,734.0067873303168"
        fill="#d2b0770"
      ></polyline>
      <polyline
        className="transition-all ease-in hover:opacity-50"
        points=" 1600,441.43697478991606, 1600,900, 1234.0545454545456,900, 1358.9368708411537,518.4151168742537"
        fill="#820b3870"
      ></polyline>
      <polyline
        className="transition-all ease-in hover:opacity-50"
        points=" 873.5783132530121,0, 924.6031468531468,0, 1007.6451233964696,354.4776909162734, 905.6086623351392,651.4037926047441, 712.9603677221654,291.92604698672113"
        fill="#72ca3570"
      ></polyline>
      <polyline
        className="transition-all ease-in hover:opacity-50"
        points=" 192.2363834422658,0, 873.5783132530121,0, 712.9603677221654,291.92604698672113, 404.9713413559376,381.42713157177883"
        fill="#33c5cf70"
      ></polyline>
      <polyline
        className="transition-all ease-in hover:opacity-50"
        points=" 712.9603677221654,291.92604698672113, 905.6086623351392,651.4037926047446, 904.0286016949152,900, 724.4127423822715,900, 406.93012346090137,428.34886654068055, 404.9713413559376,381.42713157177883"
        fill="#e48a6870"
      ></polyline>
      <polyline
        className="transition-all ease-in hover:opacity-50"
        points=" 0,0, 192.2363834422658,0, 404.9713413559376,381.42713157177883, 406.93012346090137,428.34886654068055, 0,734.0067873303168"
        fill="#266d9b70"
      ></polyline>
      <polyline
        className="transition-all ease-in hover:opacity-50"
        points=" 924.6031468531468,0, 1045.8016759776535,0, 1329.1669537476193,269.7999187277866, 1314.230924940416,345.2984753011851, 1007.6451233964697,354.4776909162732"
        fill="#d6b46670"
      ></polyline>
      <polyline
        className="transition-all ease-in hover:opacity-50"
        points=" 1600,72.64176245210729, 1600,441.43697478991606, 1358.9368708411534,518.4151168742535, 1314.230924940416,345.2984753011851, 1329.1669537476193,269.7999187277866"
        fill="#8d679a70"
      ></polyline>
      <polyline
        className="transition-all ease-in hover:opacity-50"
        points=" 1045.8016759776535,0, 1600,0, 1600,72.64176245210729, 1329.1669537476193,269.7999187277866"
        fill="#dcb38e70"
      ></polyline>
    </g>
  );
}
