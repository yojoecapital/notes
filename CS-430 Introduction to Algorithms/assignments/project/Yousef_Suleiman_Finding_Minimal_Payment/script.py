import argparse
from datetime import datetime

def parse_input(path: str, encoding: str):
    """
    returns `purchases` which is a mapping of `item_id` -> `(amount, ticket_price)`
    """
    purchases: dict[int, tuple[int, float]] = {}
    with open(path, "r", encoding=encoding) as file:
        lines = file.readlines()
        num_purchases = int(lines[0].strip())
        for i in range(1, num_purchases + 1):
            values = lines[i].split()
            item_id = int(values[0])
            amount = int(values[1])
            ticket_price = float(values[2])
            purchases[item_id] = (amount, ticket_price)
    return purchases

def parse_promotions(path: str, encoding: str):
    """
    returns `promotions` which is a list of `(merchandise, total_price)`
    where `merchandise` is a mapping of `item_id` -> `amount`
    """
    promotions: list[tuple[dict[int, int], float]] = []
    with open(path, "r", encoding=encoding) as file:
        lines = file.readlines()
        num_promotions = int(lines[0].strip())
        for i in range(1, num_promotions + 1):
            values = lines[i].split()
            num_types = int(values[0])
            merchandise: dict[int, int] = {}
            for i in range(1, num_types * 2 + 1, 2):
                item_id = int(values[i])
                amount = int(values[i + 1])
                merchandise[item_id] = amount
            total_price = float(values[len(values) - 1])
            promotions.append((merchandise, total_price))
    return promotions

def is_eligible(cart: dict[int, int], merchandise: dict[int, int]):
    """
    given a `cart` and a `merchandise` from a promotion, 
    check if the cart contains everything in the promotion's `merchandise`
    """
    for item_id, amount in merchandise.items():
        if item_id not in cart or cart.get(item_id) < amount:
            return False
    return True
    
def apply_promotion(cart: dict[int, int], merchandise: dict[int, int]):
    """
    given a `cart` and a `(merchandise, total_price)` from a promotion, 
    apply the promotion to the cart after making a new cart
    """
    new_cart = cart.copy()
    for item_id, amount in merchandise.items():
        new_amount = new_cart[item_id] - amount
        if new_amount == 0:
            del new_cart[item_id]
        else:
            new_cart[item_id] = new_amount
    return new_cart

def calculate_output(use_memo: bool, purchases: dict[int, tuple[int, float]], promotions: list[tuple[dict[int, int], float]]):
    """
    returns the minimum payment given `purchases` and `promotions`
    """
    def get_best(
        cart: dict[int, int], 
        memo: dict[frozenset[dict[int, int]], tuple[list[tuple[tuple[int, int] | int, bool]], int]] = {}
    ) -> tuple[list[tuple[tuple[int, int] | int, bool]], float]:
        """
        `cart` is a mapping `item_id` -> `amount` and `memo` is a mapping `cart` -> `(itemization, price)`
        where `itemization` is a list of `(matcher, is_promotion)`; `matcher` is either an `(item_id, amount)` for a ticket priced purchase
        or it is an index into a promotion; `is_promotion` indicates which case it is
        """
        # base case
        if not cart:
            return ([], 0)
                
        # check if the calculation was memoized
        key = frozenset(cart.items())
        if use_memo and key in memo:
            return memo[key]
        
        # calculate the itemization and pricing of only using ticket pricing for the cart
        best_itemization = []
        best_price = 0
        for item_id, amount in cart.items():
            _, ticket_price = purchases[item_id]
            best_itemization.append(((item_id, amount), False))
            best_price += ticket_price * amount

        # traverse through all the promotions
        for index, (merchandise, total_price) in enumerate(promotions):
            if is_eligible(cart, merchandise):
                new_cart = apply_promotion(cart, merchandise)

                # using the new cart, get the next best itemization and price
                promotion_itemization, promotion_price = get_best(new_cart, memo)
                promotion_price += total_price
                promotion_itemization += [(index, True)]

                # update the best ones
                if promotion_price < best_price:
                    best_price = promotion_price
                    best_itemization = promotion_itemization

        memo[key] = (best_itemization, best_price)
        return (best_itemization, best_price)
    
    # make our cart
    cart = { item_id: amount for item_id, (amount, _) in purchases.items() }
    return get_best(cart)

def write_output(
    path: str, encoding: str, verbose: bool,
    purchases: dict[int, tuple[int, float]], 
    promotions: list[tuple[dict[int, int], float]],
    itemization: list[tuple[tuple[int, int] | int, bool]], price: float
):
    def get_itemization(entry: tuple[tuple[int, int] | int, bool]):
        method, is_promotion = entry
        if is_promotion:
            index: int = method
            merchandise, total_price = promotions[index]
            s = [f"{str(amount)} of item {str(item_id)}" for item_id, amount in merchandise.items()]
            return f"Apply promotion buy {', '.join(s)} for ${str(total_price)}."
        else:
            tup: tuple[int, int] = method
            item_id, amount = tup
            _, ticket_price = purchases[item_id]
            return f"Buy {str(amount)} of item {str(item_id)} at ticket price ${str(ticket_price)}"
    s = [f"{index + 1}. {get_itemization(entry)}" for index, entry in enumerate(itemization)]
    result = "# Itemization:\n\n" + '\n\n'.join(s) + f"\n\nTotal: ${str(price)}"
    if verbose:
        print(result)
    with open(path, "w", encoding=encoding) as file:
        file.write(result)

def main():
    parser = argparse.ArgumentParser(description="find the minimal payment for a purchase given a set of promotions")
    parser.add_argument("-i", "--input", type=str, default="input.txt", help="set the file path to read the input")
    parser.add_argument("-p", "--promotions", type=str, default="promotions.txt", help="set the file path to read the promotions")
    parser.add_argument("-o", "--output", type=str, default="output.txt", help="set the file path to write the output")
    parser.add_argument("-e", "--encoding", type=str, default="utf-16", help="set the encoding format for all files")
    parser.add_argument("-v", "--verbose", action="store_true", help="enable time display")
    parser.add_argument("-nm", "--no_memo", action="store_true", help="disable memoization")
    args = parser.parse_args()
    purchases = parse_input(args.input, args.encoding)
    promotions = parse_promotions(args.promotions, args.encoding)
    start_time = datetime.now()
    itemization, price = calculate_output(not args.no_memo, purchases, promotions)
    elapsed_time = datetime.now() - start_time
    if args.verbose:
        print(f"Elapsed time: {elapsed_time} seconds")
    write_output(args.output, args.encoding, args.verbose, purchases, promotions, itemization, price)

if __name__ == "__main__":
    main()