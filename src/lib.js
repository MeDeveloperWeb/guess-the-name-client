export function getResultDescription(result, players, isImposter) {
  if (result.voting === 'tie') {
    let player1, player2;
    for (const player of players) {
      if (player._id === result.player1) player1 = player.username;
      else if (player._id === result.player2) player2 = player.username;
    }

    return {
      heading: isImposter ? 'You Won!' : 'You lost!',
      info:
        result.description +
        ` Voting results were tied between ${player1} and ${player2} with ${result.count} votes.`
    };
  }

  const player = players.find(({ _id }) => result.player === _id).username;

  console.log(isImposter);
  if (isImposter) {
    console.log(isImposter, result.winner);
    if (result?.winner === 'imposter')
      return {
        heading: 'You Won!',
        info:
          result?.description +
          ` ${player} was voted out with ${result.count} votes.`
      };

    return {
      heading: 'You Lost!',
      info:
        result?.description + ` You were voted out with ${result.count} votes.`
    };
  }

  if (result.winner !== 'imposter')
    return {
      heading: 'You Won!',
      info:
        result?.description +
        ` You voted out imposter ${player} with ${result.count} votes.`
    };

  const imposter = players.find(({ _id }) => result.imposter === _id).username;

  return {
    heading: 'You Lost!',
    info:
      result?.description +
      ` ${imposter} was the imposter. You voted out teammate ${player} with ${result.count} votes.`
  };
}
